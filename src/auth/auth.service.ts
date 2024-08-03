import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { SignInUserRequest, SignUpUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { Logger } from "winston";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from "./auth.validation";
import * as jwt from 'jsonwebtoken';
import { BlacklistService } from "./blacklist/blacklist.service";

@Injectable()
export class AuthService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private blacklistService: BlacklistService
    ){}
    

    async signup(request: SignUpUserRequest): Promise<UserResponse>{
        const SignUpRequest: SignUpUserRequest = this.validationService.validate(AuthValidation.SIGNUP, request);

        const userWithSameEmail = await this.prismaService.user.count({
            where:{
                email: SignUpRequest.email,
            }
        })
        if(userWithSameEmail != 0 ){
            throw new HttpException('Email already registered', 400);
        }
        SignUpRequest.password = await bcrypt.hash(SignUpRequest.password, 10)

        const user = await this.prismaService.user.create({
            data: SignUpRequest
        })

        return {
            name : user.name,
            email : user.email,
            street : user.street,
            city : user.city,
            province : user.province,
            country : user.country,
            postal_code : user.postal_code
        };
    }

    async signin(request: SignInUserRequest) {
        this.logger.info(`AuthService.signin(${JSON.stringify(request)})`);
    
        const singinRequest: SignInUserRequest = this.validationService.validate(AuthValidation.SIGNIN, request);
    
        const user = await this.prismaService.user.findUnique({
          where: {
            email: singinRequest.email,
          },
        });
    
        if (!user) {
          throw new HttpException('Email or password is invalid', 401);
        }
    
        const isPasswordValid = await bcrypt.compare(singinRequest.password, user.password);
        if (!isPasswordValid) {
          throw new HttpException('Email or password is invalid', 401);
        }
    
        const token = this.jwtService.sign({
          sub: user.id,
          email: user.email,
          role: user.role
        });
    
        const result = await this.prismaService.user.findUnique({
          where: {
            email: singinRequest.email,
          },
            select: {
            name: true,
            email: true
          }
        });

        return { result, token };
    }

    async profile(user: any): Promise<UserResponse>{
        this.logger.info(`AuthService.profile(${JSON.stringify(user)})`);
        const userProfile = await this.prismaService.user.findUnique({
            where: {
              id: user.id,
            },
        });
      
        if (!userProfile) {
        throw new HttpException('User not found', 401);
        }
          
        const userResponse: UserResponse = {
            name: userProfile.name,
            email: userProfile.email,
            street: userProfile.street,
            city: userProfile.city,
            province: userProfile.province,
            country: userProfile.country,
            postal_code: userProfile.postal_code,
        };
        return userResponse;
    }

    async update(id: string, request: UpdateUserRequest): Promise<UserResponse>{
        const createRequest: UpdateUserRequest = this.validationService.validate(
              AuthValidation.UPDATE, request
        );
        const user = await this.prismaService.user.update({
            where:{id:id},
            data: createRequest
        })
        return user
    }
    
    async signout(token: string) {
      if (!token) {
        return { message: 'No token provided' };
      }
      const authToken = token.split(' ')[1];
      try {
        const decoded: any = jwt.decode(authToken);
        if (!decoded || !decoded.exp) {
          return { message: 'Invalid token' };
        }
        const expiresAt = new Date(decoded.exp * 1000);
        await this.blacklistService.blacklistToken(authToken, expiresAt);
        return { message: 'Logout successful' };
      } catch (error) {
        return { message: 'Invalid token' };
      }
    }
}
