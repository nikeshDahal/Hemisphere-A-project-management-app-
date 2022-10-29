import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './entities/project.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:"Projects", schema:projectSchema
    }])
  ],
  providers: [ProjectsResolver, ProjectsService],
  exports:[ProjectsService]
})
export class ProjectsModule {}
