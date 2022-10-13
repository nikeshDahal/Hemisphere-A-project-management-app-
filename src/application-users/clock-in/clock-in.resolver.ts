import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClockInService } from './clock-in.service';

import { CreateClockInInput } from './dto/create-clock-in.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuardUser } from '../auth/guard/jwt-authGuard';
import { CurrentUser } from '../auth/decorator/currentUser';
import { ClockInOutput } from './dto/clock-in-output';


@Resolver(() => ClockInOutput)
export class ClockInResolver {
  constructor(private readonly clockInService: ClockInService) {}

  @UseGuards(JwtAuthGuardUser)
  @Mutation(() => ClockInOutput)
  async createClockIn(@CurrentUser() currentUser:any, @Args('createClockInInput') createClockInInput: CreateClockInInput) {
    const clockIn = await this.clockInService.create(currentUser._id ,createClockInInput);
    console.log("clockIN=>", clockIn)
    return clockIn;
  }

  @Query(() => [ClockInOutput], { name: 'listClockedIns' })
  async findAll() {
    return this.clockInService.findAllClockedInProjects();
  }

}
