import { Module } from '@nestjs/common';
import { ApplicationUsersService } from './application-users.service';
import { ApplicationUsersResolver } from './application-users.resolver';

@Module({
  providers: [ApplicationUsersResolver, ApplicationUsersService]
})
export class ApplicationUsersModule {}
