import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Admin extends mongoose.Document {
  @Prop({type:String})
  @Field()
  userName:string

  @Prop({type:String})
  @Field()
  email:string

  @Prop({type:String})
  @Field()
  password:string

  // @Prop({ type: String })
  // @Field()
  // refreshToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)

