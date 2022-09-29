import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  
  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  confirmPassword: string;
}