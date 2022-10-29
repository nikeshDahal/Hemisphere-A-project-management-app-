import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserType } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApplicationUserOutput } from './dto/response-user.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { JwtAuthGuardUser } from 'src/application-users/auth/guard/jwt-authGuard';
import { RolesGuard } from 'src/application-users/auth/guard/roles.guard';
import { HasRoles } from 'src/application-users/auth/decorator/has-roles.decorator';
import { CurrentAdmin } from '../authentication/Decorator/current.admin';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Mutation(() => ApplicationUserOutput ,{ name: 'create_application_user' })
  createUser(@CurrentAdmin() currentAdmin:any  , @Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(currentAdmin._id, createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ApplicationUserOutput], { name: 'listApplicationusers' })
  async findAll(@CurrentAdmin() currentAdmin:any) {
    return await  this.usersService.findAll(currentAdmin._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ApplicationUserOutput)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    console.log("id=====>",id)
    return this.usersService.remove(id);
  }

  @Query(() => ApplicationUserOutput ,{ name: 'findUserById' })
  findUserById(@Args('id') id: string){
    console.log("id=>",id)
    return this.usersService.findOne(id);
  }
}
