import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {


  @Field(() => [Number])
  coordinates: Number[];
}

@InputType()
export class CreateClockInInput {

  @Field(() => CreateLocationInput)
  location: CreateLocationInput;

  @Field(() => ID)
  projectId: string;
}
