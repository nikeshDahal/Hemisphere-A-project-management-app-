import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { loginInput } from './dto/login.input';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
// import {sendForgetPasswordTokenMail} from './utils/sendEmail';
// import {sendMail} from './utils/sendEmail';
import { strict } from 'assert';
import { ForgetPasswordInput } from './dto/forgetPassword-input';
import { sendMail } from './utils/sendEmail';



@Injectable()
export class AuthenticationService {
  constructor(
    private adminService:AdminsService,
    private jwtService: JwtService,
    private sendMail : sendMail
  ){}

  async loginAdmin(loginData:loginInput){
    const admin = await this.adminService.findByEmail(loginData.email);
    if(!admin){
      throw new NotFoundException("email not registered");
    }
    const validPassword = await bcrypt.compare(loginData.password,admin.password)
    if(!validPassword){
      throw new BadRequestException("invalid password");
    }
    const payload = {
      adminId:admin.id,
      adminEmail :admin.email
    }
    const access_token =await this.generateJwtToken(payload);
    return{
      admin,
      access_token
    }
  }

  // async resetPassword()

  async forgetPassword(forgetpasswordData:ForgetPasswordInput){
    const admin = await this.adminService.findByEmail(forgetpasswordData.email);
    if (!admin){
      throw new BadRequestException("email not registered");
    };
    const payload = {
      adminId:admin.id,
      adminEmail :admin.email
    }
    const forgetPasswordTokens = await this.generateJwtToken(payload)
    // var dynamic_template_data = {
    //   token:forgetPasswordTokens
    // }
    const mailSend=await this.sendMail.sendForgetPasswordTokenMail(admin.email,admin.userName,forgetPasswordTokens)
    return {
      token:forgetPasswordTokens,
      mailSend
    }
  }

  // async generateOtp(email:string){
  //     const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  //     const hashOtp = await bcrypt.hash(otp, 10);
  //     await this.adminService.findByIdAndUpdate(
  //       admin.id, {
  //       otp: hashOtp,
  //       otpCreatedAt: otpCreatedAt,
  //     });
  //     console.log("hash",hashOtp)
  //     return { otp };
  // }


  private async generateJwtToken(payload:any){
    return await this.jwtService.signAsync(payload)
  }
}


