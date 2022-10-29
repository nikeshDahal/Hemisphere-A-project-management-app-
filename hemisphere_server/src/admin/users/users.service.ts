import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
var mongoose = require('mongoose');

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(id:string , createUserInput: CreateUserInput) {
    const user = await this.userModel.findOne({
      email: createUserInput.email,
    });
    if (user) {
      throw new BadRequestException(
        'user with givrn email address already existed',
      );
    }
    const user1 = await this.userModel.findOne({
      username: createUserInput.username,
    });
    if (user1) {
      throw new BadRequestException('username should be unique');
    }

    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    const createdUser = new this.userModel({...createUserInput, createdBy:id});
    console.log(createdUser);
    return createdUser.save();
  }

  async findAll(id:string) {
    const users = await this.userModel.find({createdBy:id}).exec();
    console.log('users=>', users);
    return users;
  }

  // async findOtherUserByPM() {
  //   const users = await this.userModel.find({
  //     userType: { $nin: ['project manager', 'client'] },
  //   });
  //   console.log('filtered users=>', users);
  //   return users;
  // }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const users = await this.userModel.find({ _id: { $ne: id } }).exec();
    const isUserNameTaken = users.filter(
      (user) => user.username === updateUserInput.username,
    );
    if (isUserNameTaken.length > 0) {
      throw new BadRequestException('username already taken. SORRY !!');
    }

    const isEmailTaken = users.filter(
      (user) => user.email === updateUserInput.email,
    );
    if (isEmailTaken.length > 0) {
      throw new BadRequestException('Email already taken. SORRY !!');
    }

    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        10,
      );
    }
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('user not found');
    }
    console.log('updated User =>', updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove({ _id: id });
    console.log('removed User =>', user);
    return user;
  }
}
