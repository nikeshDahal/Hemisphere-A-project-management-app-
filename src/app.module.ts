import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
// import { ApplicationUsersModule } from './application-users/application-users.module';
import { UsersModule } from './admin/users/users.module';
import { ProjectsModule } from './admin/projects/projects.module';
import { AdminsModule } from './admin/admins/admins.module';
import { AuthenticationModule } from './admin/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './application-users/auth/auth.module';

// import configuration from './admin/authentication/utils/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Hemisphere'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context:({req})=>({req}),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      envFilePath:`.env.${process.env.NODE_ENV ||'dev'}`,
      isGlobal: true,
      expandVariables: true,
    }),

    // ApplicationUsersModule,
    UsersModule,
    ProjectsModule,
    AdminsModule,
    AuthenticationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
