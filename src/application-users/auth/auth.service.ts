import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/admin/users/users.service';
import { UserLoginInput } from './dto/userLogin-input';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async loginUser(loginData: UserLoginInput) {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user) {
      throw new NotFoundException('user not registered');
    }
    const validPassword = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!validPassword) {
      throw new BadRequestException('invalid password');
    }
    const payload = {
      userId: user.id,
      userEmail: user.email,
    };
    const { accessToken, refreshToken } = await this.generateJwtToken(payload);
    await this.updateRefreshToken(user.id , refreshToken)
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

   //3 validate access token and create new refresh and saved in db , and return new access token
   async refreshTokenValidation(userId: string, refresh: string) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user || !user.refreshToken) {
        throw new ForbiddenException('Access Denied');
      }
      const refreshTokenMatch = await bcrypt.compare(
        refresh,
        user.refreshToken,
      );
      if (!refreshTokenMatch) {
        throw new ForbiddenException('Access Denied');
      }
      const payload = {
        userId: user.id,
        userEmail: user.email,
      };
      const { accessToken, refreshToken } = await this.generateJwtToken(payload);
      await this.updateRefreshToken(user.id, refreshToken);
  
      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('error in login');
    }
  }


  //2 created refresh tokens are hashed and saved into database at the time of login
  async updateRefreshToken(id: string, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    const user = await this.userService.findOne(id);
    user.refreshToken = hashRefreshToken;
    user.save();
  }

  // 1 generates access and refresh tokens at the time of login
  private async generateJwtToken(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '15m',
      }),
      await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '300m',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
