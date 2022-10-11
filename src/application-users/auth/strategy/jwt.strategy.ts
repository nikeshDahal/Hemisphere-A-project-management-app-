import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/admin/users/users.service';
import { Console } from 'console';

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy,'jwtUser') {
  constructor(
    private readonly configService:ConfigService,
    private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
    });
  }

  public async validate(payload:any){
    const user = await this.userService.findOne(payload.userId);
    if(!user){
        throw new NotFoundException("user not Found")
    }
    console.log("user fetched after validation=>", user)
    return user
  }
}
