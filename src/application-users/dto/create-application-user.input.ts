import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateApplicationUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
