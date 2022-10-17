import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CurrentUser } from '../auth/decorator/currentUser';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuardUser } from '../auth/guard/jwt-authGuard';
import { TaskListResponse } from './dto/taskList-response';
import { HasRoles } from '../auth/decorator/has-roles.decorator';
import { UserType } from 'src/admin/users/entities/user.entity';
import { RolesGuard } from '../auth/guard/roles.guard';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @HasRoles(UserType.PROJECT_MANAGER)
  @UseGuards(JwtAuthGuardUser , RolesGuard)
  @Mutation(() => Task , { name: 'createTasks' })
  createTask(@CurrentUser() currentUser:any ,@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(currentUser._id,createTaskInput);
  }

  @HasRoles(UserType.PROJECT_MANAGER )
  @UseGuards(JwtAuthGuardUser , RolesGuard)
  @Query(()=>[TaskListResponse] , {name:"listTaskByPm"})
  listTaskAssignedByPm(@CurrentUser() currentUser:any){
    return this.taskService.findTaskAssignedByPm(currentUser._id)
  }

  @UseGuards(JwtAuthGuardUser)
  @Query(()=>[TaskListResponse] , {name:"listTaskByUser"})
  listTaskAssignedForUser(@CurrentUser() currentUser:any){
    return this.taskService.findTaskAssignedForUser(currentUser._id)
  }

  


}
