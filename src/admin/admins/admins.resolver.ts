import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AdminResponse } from './dto/response-admin.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CurrentAdmin } from '../authentication/Decorator/current.admin';
import { ClockInOutput } from 'src/application-users/clock-in/dto/clock-in-output';
import { ClockInService } from 'src/application-users/clock-in/clock-in.service';
import { TaskListResponse } from 'src/application-users/task/dto/taskList-response';
import { TaskService } from 'src/application-users/task/task.service';
// import { RefreshJwtGuard } from '../authentication/guards/jwt-refresh.guard';

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly clockInService:ClockInService,
    private readonly taskService : TaskService
    ) {}

  @Mutation(() => AdminResponse)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminsService.create(createAdminInput);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [AdminResponse], { name: 'listOfAdmins' })
  // listAdmins() {
  //   return this.adminsService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => AdminResponse, { name: 'AdminProfile' })
  async myProfile(@CurrentAdmin() currentAdmin:Admin) {
    return currentAdmin
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AdminResponse,{name:'updateAdmin'})
  updateAdmin(@CurrentAdmin() currentAdmin:any , @Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminsService.update(currentAdmin._id, updateAdminInput);
  }

  // @UseGuards(RefreshJwtGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => AdminResponse,{name:'removeAdmin'})
  async removeAdmin(@CurrentAdmin() currentAdmin:any) {
    return this.adminsService.remove(currentAdmin._id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ClockInOutput], { name: 'listClockedIns' })
  async findAll() {
    return this.clockInService.findAllClockedInProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [TaskListResponse], { name: 'listAllTasksByAdmin' })
  listAllTasks() {
    return this.taskService.findAll();
  }
}
