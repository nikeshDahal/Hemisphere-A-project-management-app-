import { Field, ObjectType } from "@nestjs/graphql";
import { ApplicationUserOutput } from "src/admin/users/dto/response-user.output";

@ObjectType()
export class UserLoginOutput {

    @Field(()=>ApplicationUserOutput)
    user:ApplicationUserOutput;

    @Field()
    accessToken:string;

    @Field()
    refreshToken:string;
}