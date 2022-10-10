import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/admin/admins/admins.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {

  constructor(
    private adminService: AdminsService,
    private readonly config: ConfigService,

    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET_KEY')
    });
  }

  public async validate(payload:any) {
    const admin = await this.adminService.findOne(payload.adminId);
    console.log("refresh validation", admin)
    if (!admin) {
      throw new UnauthorizedException('admin not found with given credentials');
    }
    console.log('admin fetched after token validation', admin);
    return admin;
  }

}
