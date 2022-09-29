import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  
  async create(createUserInput: CreateUserInput) {
    const user = await this.userModel.findOne({
      email:createUserInput.email
    });
    if(user){
      throw new BadRequestException("user with givrn email address already existed")
    }
    createUserInput.password = await bcrypt.hash(createUserInput.password,10);
    const createdUser = new this.userModel(createUserInput);
    console.log(createdUser)
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    if(updateUserInput.password){
      updateUserInput.password = await bcrypt.hash(updateUserInput.password,10)
    }
    const updatedUser = await this.userModel.findOneAndUpdate({_id:id}, { $set: updateUserInput }, { new: true }).exec();
    if(!updatedUser){
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
