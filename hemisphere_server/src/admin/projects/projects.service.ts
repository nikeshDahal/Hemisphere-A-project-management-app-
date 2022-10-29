import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Projects') private projectModel: Model<Project>) {}
  async create(currentAdmin: any, createProjectInput: CreateProjectInput) {
    const project = await this.projectModel.findOne({
      projectName: createProjectInput.projectName,
    });
    if (project) {
      throw new BadRequestException('project name already taken');
    }
    const { projectName, description, startDate, endDate, users } =
      createProjectInput;
    const projectCreated = await this.projectModel.create({
      projectName,
      description,
      startDate,
      endDate,
      users,
      createdBy: currentAdmin._id,
    });
    projectCreated.save();
    const projectResponse = await this.projectModel.aggregate([
      {
        $match: {
          _id: projectCreated._id,
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
      // { $unwind: '$users'},
      { $unwind: '$createdBy' },
    ]);
    console.log('projectResponse=>', projectResponse);
    return projectResponse;
  }

  async findAll() {
    const projects = await this.projectModel.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { userId: '$users' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$userId'],
                },
              },
            },
          ],
          as: 'users',
        },
      },
      { $addFields: { totalAssignedUser: { $size: '$users' } } },
      {
        $lookup: {
          from: 'admins',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $unwind: '$createdBy' },
    ]);
    return projects;
  }

  async findAssignedProjects(id: string) {
    return await this.projectModel.aggregate([
      {
        $match:{users: { $in: [id] }}
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$users' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$userId'],
                },
              },
            
            },
            {
              $match:{  userType:{ $nin: ['project manager', 'client']} }
            },
          ],
          as: 'users',
        },
      },
      { $unwind: '$createdBy' },

    ])
    // find({ users: { $in: [id] } });
  }

  async findAssignedProjectsForUser(curentUserId:string){
    const projects = await this.projectModel.find({ users: { $in: [curentUserId] } })
    console.log("projestsAssignedToUsers=>",projects)
    return projects;
  }

  async findOne(id: string) {
    try {
      const project = await this.projectModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: '$users' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$userId'],
                  },
                },
              },
            ],
            as: 'users',
          },
        },
        { $addFields: { totalAssignedUser: { $size: '$users' } } },
        {
          $lookup: {
            from: 'admins',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        { $unwind: '$createdBy' },
      ]);
      return project;
    } catch (error) {
      throw new NotFoundException('project not found');
    }
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const projects = await this.projectModel.find({ _id: { $ne: id } }).exec();
    const isProjectNameTaken = projects.filter(
      (project) => project.projectName === updateProjectInput.projectName,
    );
    if (isProjectNameTaken.length > 0) {
      throw new BadRequestException('project name already taken. SORRY !!');
    }

    const updateProject = await this.projectModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateProjectInput },
        { new: true },
      )
      .populate('users');

    if (!updateProject) {
      throw new NotFoundException('project not found');
    }
    return updateProject;
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndRemove({ _id: id });
    console.log('removed project =>', project);
    return project;
  }
}
