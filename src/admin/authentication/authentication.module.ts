import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { AdminsModule } from '../admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/acess-token-strategy';

@Module({
  imports:[
    AdminsModule,
    JwtModule.register({
      secret: 'ACCESS_kEY',
      signOptions: {
        expiresIn: '1800s',
      },
    }),
  ],
  providers: [AuthenticationResolver, AuthenticationService , JwtStrategy]
})
export class AuthenticationModule {}
