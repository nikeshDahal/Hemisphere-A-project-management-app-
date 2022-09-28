import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { AdminLoginResponse } from './dto/admin-login-response.output';
import { ForgetPasswordResponse } from './dto/forget-password-response.output';
import { ForgetPasswordInput } from './dto/forgetPassword-input';
import { loginInput } from './dto/login.input';
import { Authentication } from './entities/authentication.entity';
// import { sendForgetPasswordTokenMail } from './utils/sendEmail';
// // import { CreateAuthenticationInput } from './dto/login.input';
// // import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

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

  
}
