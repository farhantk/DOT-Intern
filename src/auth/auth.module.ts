import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ValidationService } from '../common/validation.service';

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        global: true,
        secret: process.env.SECRET,
        signOptions: { 
          expiresIn: '15m' },
      }),
    ],
  providers: [
    AuthService, 
    JwtStrategy, 
    ValidationService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
