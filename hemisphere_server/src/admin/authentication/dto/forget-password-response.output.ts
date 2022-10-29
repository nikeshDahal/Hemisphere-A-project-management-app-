import { Field, ObjectType } from "@nestjs/graphql";
// import { AdminResponse } from "src/admin/admins/dto/response-admin.output";

@ObjectType()
export class ForgetPasswordResponse {

    @Field(()=>Boolean)
    mailSend:boolean;
    
    @Field(()=>String)
    token:string;
}