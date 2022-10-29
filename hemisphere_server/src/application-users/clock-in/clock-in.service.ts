import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClockInInput } from './dto/create-clock-in.input';
import { ClockIn } from './entities/clock-in.entity';

@Injectable()
export class ClockInService {
  constructor(@InjectModel('ClockIn') private clockInModel: Model<ClockIn>) {}
  async create(userId: string, createClockInInput: CreateClockInInput) {
    // const clockInDetail = await this.clockInModel.findOne({
    //   projectId: createClockInInput.projectId,
    // });
    // const check = clockInDetail.clockOuttime !== null 
    // console.log(check)
    // if (check) {
    //   throw new BadRequestException('user already clocked in this project');
    // }
      const clockedIn = new Date();
      const clockedInTime = clockedIn.toLocaleTimeString();
      const clockedInDate = clockedIn.toDateString();
      const clockedInDatas = {...createClockInInput , clockedInTime , clockedInDate, userId }
      const newClockIn = await this.clockInModel.create(clockedInDatas);
      return await newClockIn.save();
  }

  async findAllClockedInProjects(){
    const clockIn = await this.clockInModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField:'userId',
          foreignField:'_id',
          as:'userId'
        },
      },
      { $unwind: '$userId' },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'projectId',
        },
      },
      { $unwind: '$projectId' },
    ]);
    console.log("clockinsss=>",clockIn)
    return clockIn
  }

  async findMyClockIns(currentUserId:string){
    const clockIns = await this.clockInModel.aggregate([
      {
        $match:{
          userId:currentUserId
        }
      },
      {
        $lookup: {
          from: 'users',
          localField:'userId',
          foreignField:'_id',
          as:'userId'
        },
      },
      { $unwind: '$userId' },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'projectId',
        },
      },
      { $unwind: '$projectId' },
    ]);
    console.log("clockinsss=>",clockIns)
    return clockIns
  }
}
