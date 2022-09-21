import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/admin/admins/admins.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {

  constructor(private adminService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:'ACCESS_kEY',
    });
  }

  public async validate(payload:any) {
    const admin = await this.adminService.findOne(payload.adminId);
    if (!admin) {
      throw new UnauthorizedException('admin not found with given credentials');
    }
    console.log('admin fetched after token validation', admin);
    return admin;
  }
}
