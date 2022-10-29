import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectResponse } from 'src/admin/projects/dto/response-project.output';
import { Project } from 'src/admin/projects/entities/project.entity';
import { ApplicationUserOutput } from 'src/admin/users/dto/response-user.output';
import { User } from 'src/admin/users/entities/user.entity';

@ObjectType()
export class TaskListResponse {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  TitleOfTask: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  Deadline: Date;

  @Field(() => ApplicationUserOutput)
  AssignedTo: ApplicationUserOutput;

  @Field(() => ApplicationUserOutput)
  AssignedBy: ApplicationUserOutput;

  @Field(() => ProjectResponse)
  projectId: ProjectResponse;
}
