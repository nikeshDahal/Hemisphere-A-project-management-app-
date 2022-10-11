import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { CurrentAdmin } from './Decorator/current.admin';
import { AdminLoginResponse } from './dto/admin-login-response.output';
import { ForgetPasswordResponse } from './dto/forget-password-response.output';
import { ForgetPasswordInput } from './dto/forgetPassword-input';
import { loginInput } from './dto/login.input';
import { ResetPasswordInput } from './dto/reset-password-input';
import { ResetPasswordOutput } from './dto/reset-password-response.output';
import { Authentication } from './entities/authentication.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
    ) {}

  @Query(() => AdminLoginResponse, { name: 'loginAdmin' })
  async login(@Args('loginDatas') loginData: loginInput) {
    const adminDatas = await this.authenticationService.loginAdmin(loginData);
    console.log('Admin logged in sucessfully =auth resolver =>', adminDatas);
    return adminDatas;
  }

  
  @Query(()=>ForgetPasswordResponse,{name:"ForgetPassword"})
  async forgetPassword(@Args('ForgetPasswordInput') forgetpasswordInput :ForgetPasswordInput){
    return await this.authenticationService.forgetPassword(forgetpasswordInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=>ResetPasswordOutput,{name:"ResetPassword"})
  async resetPassword(@CurrentAdmin() currentAdmin:any,@Args('resetpasswordInput') resetpasswordInput:ResetPasswordInput){
    const response = await this.authenticationService.resetPassword(currentAdmin.id,resetpasswordInput);
    return{
      resetPassword:response
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=>AdminLoginResponse,{name:"validateRefreshToken"})
  async validateRefreshToken ( @Args('refreshToken') refreshToken :string){
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });
    console.log("payload check in auth resolver ", payload); 
    return await  this.authenticationService.refreshTokenValidation(payload.adminId , refreshToken)
  }
}
