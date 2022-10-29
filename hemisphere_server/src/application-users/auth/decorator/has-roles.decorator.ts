import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/admin/users/entities/user.entity';

export const HasRoles = (...roles: UserType[]) => SetMetadata('roles', roles);
