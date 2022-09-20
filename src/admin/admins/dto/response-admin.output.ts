import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AdminResponse{

    @Field(()=>ID)
    id:string;

    @Field(()=>String)
    userName:string;
    
    @Field(() => String)
    email: string;
  
    @HideField()
    password: string;
}