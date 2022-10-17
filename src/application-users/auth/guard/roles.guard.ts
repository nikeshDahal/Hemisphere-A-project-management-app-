import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from 'src/admin/users/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]); //gets role of user through has decorator and required roles should have roles in array

    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user; //gets user from tokens through context 
    return requiredRoles.some((role) => user?.userType?.includes(role)); // checks either thr role we got from decorator throgh login and the one we passed in decorator matched or not
  }
}
