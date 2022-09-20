import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectResponse {
    
    @Field(()=>ID)
    _id:string;

    @Field(()=>String)
    projectName:string;

    @Field(()=>String)
    description:string;

    @Field(() => Date)
    startDate: Date;
  
    @Field(() => Date)
    endDate: Date;
  
    @Field(() => [ID])
    users: String[];


}