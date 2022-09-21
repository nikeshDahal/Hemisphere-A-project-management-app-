import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { AdminLoginResponse } from './dto/admin-login-response.output';
import { loginInput } from './dto/login.input';
import { Authentication } from './entities/authentication.entity';
// import { CreateAuthenticationInput } from './dto/login.input';
// import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService
    ) {}

  @Query(()=>AdminLoginResponse,{name:"loginAdmin"})
  async login (@Args('loginDatas') loginData : loginInput){
    const adminDatas= await this.authenticationService.loginAdmin(loginData);
    console.log("Admin logged in sucessfully =auth resolver =>",adminDatas);
    return adminDatas
}

  // @Mutation(() => Authentication)
  // createAuthentication(@Args('createAuthenticationInput') createAuthenticationInput: CreateAuthenticationInput) {
  //   return this.authenticationService.create(createAuthenticationInput);
  // }

  // @Query(() => [Authentication], { name: 'authentication' })
  // findAll() {
  //   return this.authenticationService.findAll();
  // }

  // @Query(() => Authentication, { name: 'authentication' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authenticationService.findOne(id);
  // }

  // @Mutation(() => Authentication)
  // updateAuthentication(@Args('updateAuthenticationInput') updateAuthenticationInput: UpdateAuthenticationInput) {
  //   return this.authenticationService.update(updateAuthenticationInput.id, updateAuthenticationInput);
  // }

  // @Mutation(() => Authentication)
  // removeAuthentication(@Args('id', { type: () => Int }) id: number) {
  //   return this.authenticationService.remove(id);
  // }
}
