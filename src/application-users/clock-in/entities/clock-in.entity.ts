import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from 'src/admin/projects/entities/project.entity';
import { User } from 'src/admin/users/entities/user.entity';


@Schema()
@ObjectType()
export class Location extends mongoose.Document {

  @Prop({type:[Number] })
  @Field()
  coordinates:Number
}
export const AddressSchema = SchemaFactory.createForClass(Location)


@Schema()
@ObjectType()
export class ClockIn extends mongoose.Document {

  @Prop({ type: AddressSchema })
  @Field()
  location: Location;

  @Prop({ type: String })
  @Field()
  clockedInTime: string;

  @Prop({ type: String })
  @Field()
  clockedInDate: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  @Field()
  projectId: Project;
}
export const ClockInSchema = SchemaFactory.createForClass(ClockIn)



