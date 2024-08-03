import { Body, Get, HttpCode, Post, UseGuards, Request, Controller, Put, Req, } from "@nestjs/common";
import { SignInUserRequest, SignUpUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { WebResponse } from "../model/web.model";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { NotLoggedInGuard } from "./guards/local.guard";

@Controller('/api/users')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post()
    @UseGuards(NotLoggedInGuard)
    @HttpCode(200)
    async signup(@Body() request:SignUpUserRequest,): Promise<WebResponse<UserResponse>>{
        const result = await this.authService.signup(request)
        return {
            data: result
        }
    }

    @Post('/signin')
    @UseGuards(NotLoggedInGuard)
    @HttpCode(200)
    async signin(@Body() request: SignInUserRequest) {
        const { result, token } = await this.authService.signin(request);
        return {
            data: result,
            token: token
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(200)
    async profile(@Request() req){
        const result = await this.authService.profile(req.user);
        return {
            data: result
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    @HttpCode(200)
    async process(
        @Request() req: any,
        @Body() request: UpdateUserRequest
    ):Promise<WebResponse<UserResponse>>{
        const result = await this.authService.update(req.user.id, request)
        return{
            data: result
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('signout')
    @HttpCode(200)
    async signout(@Req() req: any){
        const result = await this.authService.signout(req.headers.authorization)
        return result
    }
}
