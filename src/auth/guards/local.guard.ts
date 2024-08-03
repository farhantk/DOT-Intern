import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from '../blacklist/blacklist.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return true;
    }

    const token = authHeader.split(' ')[1];
    try {
      const isBlacklisted = await this.blacklistService.isTokenBlacklisted(token);
      if (isBlacklisted) {
        return true;
      }
      this.jwtService.verify(token);
      return false;
    } catch (error) {
      return true;
    }
  }
}
