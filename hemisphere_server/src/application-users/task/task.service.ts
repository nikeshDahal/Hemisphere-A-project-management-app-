import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';


import { CreateTaskInput } from './dto/create-task.input';

import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Tasks') private readonly taskModule: Model<Task>) {}


  async create(AssignedBy: string, createTaskInput: CreateTaskInput) {
    const alreadyAssigned = await this.taskModule.findOne({
      TitleOfTask: createTaskInput.TitleOfTask,
    });
    if (alreadyAssigned) {
      throw new BadRequestException('task already assigned');
    }
    const taskInputs = {
      ...createTaskInput,
      AssignedBy,
    };
    const createTask = await this.taskModule.create(taskInputs);
    const task = await createTask.save();
    console.log('task=>', task);
    return task;
  }

  async findAll() {
    const tasks = await this.taskModule.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedTo',
          foreignField: '_id',
          as: 'AssignedTo',
        },
      },
      { $unwind: '$AssignedTo' },
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedBy',
          foreignField: '_id',
          as: 'AssignedBy',
        },
      },
      { $unwind: '$AssignedBy' },
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
    console.log('tasks=>', tasks);
    return tasks;
  }

  async findTaskAssignedByPm(currentUserId: string) {
    const tasks = await this.taskModule.aggregate([
      {
        $match: {
          AssignedBy: currentUserId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedTo',
          foreignField: '_id',
          as: 'AssignedTo',
        },
      },
      { $unwind: '$AssignedTo' },
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedBy',
          foreignField: '_id',
          as: 'AssignedBy',
        },
      },
      { $unwind: '$AssignedBy' },
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
    console.log('tasks=>', tasks);
    return tasks;
  }

  async findTaskAssignedForUser(currentUserId: string) {
    const tasks = await this.taskModule.aggregate([
      {
        $match: {
          AssignedTo: currentUserId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedTo',
          foreignField: '_id',
          as: 'AssignedTo',
        },
      },
      { $unwind: '$AssignedTo' },
      {
        $lookup: {
          from: 'users',
          localField: 'AssignedBy',
          foreignField: '_id',
          as: 'AssignedBy',
        },
      },
      { $unwind: '$AssignedBy' },
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
    console.log('tasks=>', tasks);
    return tasks;
  }
}
