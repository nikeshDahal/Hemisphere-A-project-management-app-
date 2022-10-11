import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/admin/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyUser } from './strategy/jwt.strategy';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({}),
  ],
  providers: [AuthResolver, AuthService , JwtStrategyUser]
})
export class AuthModule {}
