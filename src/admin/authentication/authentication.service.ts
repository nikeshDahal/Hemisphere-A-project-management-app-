import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { loginInput } from './dto/login.input';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
// import { CreateAuthenticationInput } from './dto/login.input';
// import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Injectable()
export class AuthenticationService {
  constructor(
    private adminService:AdminsService,
    private jwtService: JwtService
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

  private async generateJwtToken(payload:any){
    return await this.jwtService.signAsync(payload)
  }
}


