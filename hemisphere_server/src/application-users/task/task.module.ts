import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './entities/task.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:"Tasks", schema:TaskSchema
    }])
  ],
  providers: [TaskResolver, TaskService],
  exports:[TaskService]
})
export class TaskModule {}
