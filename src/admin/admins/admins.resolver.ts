import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AdminResponse } from './dto/response-admin.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CurrentAdmin } from '../authentication/Decorator/current.admin';

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminsService.create(createAdminInput);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [AdminResponse], { name: 'listOfAdmins' })
  // listAdmins() {
  //   return this.adminsService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => Admin, { name: 'AdminProfile' })
  async myProfile(@CurrentAdmin() currentAdmin:Admin) {
    return currentAdmin
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AdminResponse,{name:'updateAdmin'})
  updateAdmin(@CurrentAdmin() currentAdmin:any , @Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminsService.update(currentAdmin._id, updateAdminInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Admin,{name:'removeAdmin'})
  async removeAdmin(@CurrentAdmin() currentAdmin:any) {
    return this.adminsService.remove(currentAdmin._id);
  }
}
