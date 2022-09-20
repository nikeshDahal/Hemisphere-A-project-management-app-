import { CreateApplicationUserInput } from './create-application-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApplicationUserInput extends PartialType(CreateApplicationUserInput) {
  @Field(() => Int)
  id: number;
}
