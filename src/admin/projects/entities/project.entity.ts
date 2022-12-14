import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from 'src/admin/admins/entities/admin.entity';
import { User } from 'src/admin/users/entities/user.entity';

@ObjectType()
@Schema()
export class Project extends mongoose.Document {
  @Prop({ type: String })
  @Field()
  projectName: string;

  @Prop({ type: String })
  @Field()
  description: string;

  @Prop({ type: Date })
  @Field()
  startDate: Date;

  @Prop({ type: Date })
  @Field()
  endDate: Date;

  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'Admin'})
  @Field()
  createdBy: Admin;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const projectSchema = SchemaFactory.createForClass(Project);