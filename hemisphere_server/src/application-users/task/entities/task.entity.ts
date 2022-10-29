import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from 'src/admin/projects/entities/project.entity';
import { User } from 'src/admin/users/entities/user.entity';


@Schema()
@ObjectType()
export class Task extends mongoose.Document {
  @Prop({ type: String })
  @Field()
  TitleOfTask: string;

  @Prop({ type: String })
  @Field()
  description: string;

  @Prop({ type: Date })
  @Field()
  Deadline: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  AssignedTo: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  AssignedBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  @Field()
  projectId: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);