import { Field, HideField, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserType } from "../entities/user.entity";

registerEnumType(UserType, { name: 'UserType' });

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String)
  email: string;

  @HideField()
  password: string;

  @Field(() => Number)
  phone: number;

  @Field(() => UserType)
  userType: UserType;

  @Field(() => String)
  refreshToken: string;
}