import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
// import { AdminUsersModule } from './admin/admin-users/admin-users.module';
import { ApplicationUsersModule } from './application-users/application-users.module';
import { UsersModule } from './admin/users/users.module';
import { ProjectsModule } from './admin/projects/projects.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Hemisphere'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    // AdminUsersModule,
    ApplicationUsersModule,
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
