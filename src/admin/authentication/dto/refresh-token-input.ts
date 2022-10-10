import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class refreshTokenInput {
  @Field(() => String)
  refreshToken: string;

}