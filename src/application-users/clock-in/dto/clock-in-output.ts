import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/admin/projects/entities/project.entity';
import { User } from 'src/admin/users/entities/user.entity';

@ObjectType()
export class Address {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  type: string;

  @Field(() => [Number])
  coordinates: Number[];
}

@ObjectType()
export class ClockInOutput {
  @Field(() => ID)
  _id: string;

  @Field(() => Address)
  location: Address;

  @Field(() => String)
  clockedInTime: string;

  @Field(() => String)
  clockedInDate: string;

  @Field(() => User)
  userId: User;

  @Field(() => Project)
  projectId: Project;
}