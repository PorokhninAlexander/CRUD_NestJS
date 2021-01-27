import { Module } from '@nestjs/common';
import { GroupMService } from './group-m.service';
import { GroupMController } from './group-m.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupM, GroupMSchema } from './schemas/group-m.schema';
import { UserM, UserMSchema } from '../user-m/schemas/user-m.schema';
import { GroupMResolver } from './group-m.resolver';

@Module({
  controllers: [GroupMController],
  providers: [GroupMService, GroupMResolver],
  imports: [
    MongooseModule.forFeature([
      { name: GroupM.name, schema: GroupMSchema },
      { name: UserM.name, schema: UserMSchema },
    ]),
  ],
  exports: [GroupMModule],
})
export class GroupMModule {}
