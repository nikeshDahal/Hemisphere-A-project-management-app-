import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './entities/admin.entity';
import { ClockInModule } from 'src/application-users/clock-in/clock-in.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Admin', schema:AdminSchema}]),
    ClockInModule
  ],
  providers: [AdminsResolver, AdminsService],
  exports:[AdminsService]
})
export class AdminsModule {}
