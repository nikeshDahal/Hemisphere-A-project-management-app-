import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ResetPasswordOutput {

    @Field(()=>Boolean)
    resetPassword:boolean;
}