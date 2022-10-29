import { Field, ObjectType } from "@nestjs/graphql";
import { AdminResponse } from "src/admin/admins/dto/response-admin.output";

@ObjectType()
export class AdminLoginResponse {

    @Field(()=>AdminResponse)
    admin:AdminResponse;

    @Field()
    accessToken:string;

    @Field()
    refreshToken:string;
}