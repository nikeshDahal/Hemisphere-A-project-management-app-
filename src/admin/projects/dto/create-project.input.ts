import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  
  @Field(() => String)
  projectName: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => [ID])
  users: string[];
}
