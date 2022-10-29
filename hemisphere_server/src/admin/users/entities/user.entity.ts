/* eslint-disable */
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from 'src/admin/admins/entities/admin.entity';

export enum UserType {
  PROJECT_MANAGER = 'project manager',
  NORMAL_STAFF = 'normal staff',
  CLIENT = 'client',
  TRADIES = 'tradies',
}

@Schema()
@ObjectType()
export class User extends mongoose.Document {
  @Prop({ type: String,required: true,trim: true  })
  @Field()
  name: string;

  @Prop({ type: String,required: true,trim: true, unique: true,})
  @Field()
  username: string;

  @Prop({ type: String, required: true,trim: true})
  @Field()
  email: string;

  @Prop({ type: String,required: true,trim: true })
  @Field()
  password: string;

  @Prop({ type: String })
  @Field()
  companyName: string;

  @Prop({ type: Number,required: true,trim: true })
  @Field()
  phone: number;

  @Prop({ type: String, enum: Object.values(UserType) ,required: true})
  @Field()
  userType: string;

  @Prop({ type: String })
  @Field()
  refreshToken: string;

  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'Admin'})
  @Field()
  createdBy: Admin;
}

export const UserSchema = SchemaFactory.createForClass(User);
