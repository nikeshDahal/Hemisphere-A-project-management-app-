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

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Mutation(() => ApplicationUserOutput ,{ name: 'create_application_user' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ApplicationUserOutput], { name: 'listApplicationusers' })
  findAll() {
    return this.usersService.findAll();
  }

  @HasRoles(UserType.PROJECT_MANAGER )
  @UseGuards(JwtAuthGuardUser , RolesGuard)
  @Query(() => [ApplicationUserOutput], { name: 'listApplicationusersByPm' })
  ListOtherUser() {
    return this.usersService.findOtherUserByPM();
  }


 
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ApplicationUserOutput)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  
}
