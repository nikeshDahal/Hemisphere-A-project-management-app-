import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AdminResponse } from "src/admin/admins/dto/response-admin.output";
import { Admin } from "src/admin/admins/entities/admin.entity";
import { ApplicationUserOutput } from "src/admin/users/dto/response-user.output";
import { User } from "src/admin/users/entities/user.entity";

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

    @Field(()=>Number,{nullable:true})
    totalAssignedUser:number;
  
    @Field(() => [ApplicationUserOutput])
    users: ApplicationUserOutput ;

    @Field(()=>AdminResponse)
    createdBy:AdminResponse


}