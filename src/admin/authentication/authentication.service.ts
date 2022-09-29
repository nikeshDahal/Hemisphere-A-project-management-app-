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
import { ResetPasswordInput } from './dto/reset-password-input';



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
  
  async resetPassword(id:string , resetPasswordInput:ResetPasswordInput){

    //hash password from input
    const newPassword = resetPasswordInput.newPassword
    const confirmedPassword = resetPasswordInput.confirmPassword;
    const matched = newPassword === confirmedPassword ? true:false
    if(!matched){
      throw new BadRequestException("confirmed password did not matched");
    }
    const hashedConfirmedPassword = await bcrypt.hash(confirmedPassword,10)
    const updatedAdminPassword=await  this.adminService.resetPassword(id ,hashedConfirmedPassword)
    return updatedAdminPassword

  }

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


  private async generateJwtToken(payload:any){
    return await this.jwtService.signAsync(payload)
  }
}


