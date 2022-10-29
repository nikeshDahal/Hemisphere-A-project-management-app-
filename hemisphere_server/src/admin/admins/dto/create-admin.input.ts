import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field(()=>String)
  userName:string

  @Field(()=>String)
  email:string

  @Field(()=>String)
  password:string

  @Field(() => Number)
  phone: number;

  @Field(()=> String)
  location: string
}
