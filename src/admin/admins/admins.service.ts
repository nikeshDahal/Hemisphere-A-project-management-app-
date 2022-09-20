import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(@InjectModel('Admin') private adminModel: Model<Admin>) {};

  async create(createAdminInput: CreateAdminInput) {
    const admin = await this.adminModel.findOne({email:createAdminInput.email});
    if(admin){
      throw new BadRequestException("admin already exist");
    }
    createAdminInput.password = await bcrypt.hash(createAdminInput.password, 10);
    const createdAdmin = new this.adminModel(createAdminInput);
    return createdAdmin.save()
  }

  async findAll() {
    const listOfAdmins = await this.adminModel.find({}) 
    return listOfAdmins
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({_id:id});
    if(!admin){
      throw new NotFoundException('admin not found')
    }
    return admin;
  }

  async update(id: string, updateAdminInput: UpdateAdminInput) {
      if (updateAdminInput.password) {
        updateAdminInput.password =await bcrypt.hash(updateAdminInput.password, 10);
      }
      const alreadyExistEmail = this.adminModel.find({email:updateAdminInput.email})
      if(alreadyExistEmail){
        throw new BadRequestException("Try out new email . email already exists")
      }
      const updatedUser = await this.adminModel
        .findOneAndUpdate({ _id: id }, { $set: updateAdminInput }, { new: true })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException('user not found');
      }
      console.log('updated Admin =>', updatedUser);
      return updatedUser;
  }

  async remove(id: string) {
    const admin = await this.adminModel.findByIdAndRemove({_id:id});
    return admin
  }
}
