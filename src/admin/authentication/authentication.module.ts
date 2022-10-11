import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { AdminsModule } from '../admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/acess-token-strategy';
import { sendMail } from './utils/sendEmail';
import { UsersService } from '../users/users.service';

@Module({
  imports:[
    AdminsModule,
    JwtModule.register({}),
  ],
  providers: [AuthenticationResolver, AuthenticationService , JwtStrategy , sendMail],
})
export class AuthenticationModule {}
