import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { UserType } from '../entities/user.entity';

registerEnumType(UserType, { name: 'UserType' });

@InputType()
export class CreateUserInput {

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String)
  email: string;

  @Field()
  password: string;

  @Field(() => Number)
  phone: number;

  @Field(() => UserType)
  userType: UserType;
}
