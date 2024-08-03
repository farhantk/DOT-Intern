import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    /* console.log("JWT Strategy validate called");
    console.log("Payload:", payload);
    console.log("SECRET:", process.env.SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log("Current Timestamp:", currentTimestamp);
    console.log("Payload exp:", payload.exp);

    if (payload.exp && payload.exp < currentTimestamp) {
      console.log("Token has expired");
      throw new UnauthorizedException();
    } */
    
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}