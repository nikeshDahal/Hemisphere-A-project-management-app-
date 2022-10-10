import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { loginInput } from './dto/login.input';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordInput } from './dto/forgetPassword-input';
import { sendMail } from './utils/sendEmail';
import { ResetPasswordInput } from './dto/reset-password-input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private adminService: AdminsService,
    private jwtService: JwtService,
    private sendMail: sendMail,
    private config: ConfigService,
  ) {}

  async loginAdmin(loginData: loginInput) {
    const admin = await this.adminService.findByEmail(loginData.email);
    if (!admin) {
      throw new NotFoundException('email not registered');
    }
    console.log("admin in lofin=>" , admin)
    const validPassword = await bcrypt.compare(
      loginData.password,
      admin.password,
    );
    if (!validPassword) {
      throw new BadRequestException('invalid password');
    }
    const payload = {
      adminId: admin.id,
      adminEmail: admin.email,
    };
    const { accessToken, refreshToken } = await this.generateJwtToken(payload);
    await this.updateRefreshToken(admin.id, refreshToken);

    return {
      admin,
      accessToken,
      refreshToken,
    };
  }

  //3 validate access token and create new refresh and saved in db , and return new access token

  async refreshTokenValidation(adminID: string, refresh: string) {
    try {
      const admin = await this.adminService.findOne(adminID);
      if (!admin || !admin.refreshToken) {
        throw new ForbiddenException('Access Denied');
      }
      const refreshTokenMatch = await bcrypt.compare(
        refresh,
        admin.refreshToken,
      );
      if (!refreshTokenMatch) {
        throw new ForbiddenException('Access Denied');
      }
      const payload = {
        adminId: admin.id,
        adminEmail: admin.email,
      };
      const { accessToken, refreshToken } = await this.generateJwtToken(payload);
      await this.updateRefreshToken(admin.id, refreshToken);
  
      return {
        admin,
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
    const admin = await this.adminService.findOne(id);
    admin.refreshToken = hashRefreshToken;
    admin.save();
  }

  //1 generates access and refresh tokens at the time of login
  private async generateJwtToken(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '15m',
      }),
      await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '300m',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async resetPassword(id: string, resetPasswordInput: ResetPasswordInput) {
    //hash password from input
    const newPassword = resetPasswordInput.newPassword;
    const confirmedPassword = resetPasswordInput.confirmPassword;
    const matched = newPassword === confirmedPassword ? true : false;
    if (!matched) {
      throw new BadRequestException('confirmed password did not matched');
    }
    const hashedConfirmedPassword = await bcrypt.hash(confirmedPassword, 10);
    const updatedAdminPassword = await this.adminService.resetPassword(
      id,
      hashedConfirmedPassword,
    );
    return updatedAdminPassword;
  }

  async forgetPassword(forgetpasswordData: ForgetPasswordInput) {
    const admin = await this.adminService.findByEmail(forgetpasswordData.email);
    if (!admin) {
      throw new BadRequestException('email not registered');
    }
    const payload = {
      adminId: admin.id,
      adminEmail: admin.email,
    };
    const { accessToken } = await this.generateJwtToken(payload);
    // var dynamic_template_data = {
    //   token:forgetPasswordTokens
    // }
    const mailSend = await this.sendMail.sendForgetPasswordTokenMail(
      admin.email,
      admin.userName,
      accessToken,
    );
    return {
      token: accessToken,
      mailSend,
    };
  }
}
