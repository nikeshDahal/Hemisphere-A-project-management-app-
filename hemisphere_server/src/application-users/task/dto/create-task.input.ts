import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  TitleOfTask: string;

  @Field(() => String)
  description: string;

  @Field(()=>Date)
  Deadline:Date;

  @Field(()=>ID)
  AssignedTo: String;

  @Field(()=>ID)
  projectId: String;

}
