import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BlacklistService } from '../blacklist/blacklist.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private blacklistService: BlacklistService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: Request,payload: any) {
    /* console.log("JWT Strategy validate called");
    console.log("Payload:", payload);
    console.log("SECRET:", process.env.SECRET);

    console.log("Current Timestamp:", currentTimestamp);
    console.log("Payload exp:", payload.exp);
    */

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const token = req.headers['authorization'].split(' ')[1];
    const isBlacklisted = await this.blacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException();
    }

    if (payload.exp && payload.exp < currentTimestamp) {
      throw new UnauthorizedException();
    } 
    
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}