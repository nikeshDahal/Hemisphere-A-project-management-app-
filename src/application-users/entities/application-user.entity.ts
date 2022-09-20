import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ApplicationUser {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
