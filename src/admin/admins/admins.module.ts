import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './entities/admin.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Admin', schema:AdminSchema}])],
  providers: [AdminsResolver, AdminsService]
})
export class AdminsModule {}
