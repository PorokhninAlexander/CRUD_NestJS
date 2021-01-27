import { Module } from '@nestjs/common';
import { UserMService } from './user-m.service';
import { UserMController } from './user-m.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserM, UserMSchema } from './schemas/user-m.schema';
import { GroupM, GroupMSchema } from '../group-m/schemas/group-m.schema';
import { UserMResolver } from './user-m.resolver';

@Module({
  controllers: [UserMController],
  providers: [UserMService, UserMResolver],
  imports: [
    MongooseModule.forFeature([
      { name: UserM.name, schema: UserMSchema },
      { name: GroupM.name, schema: GroupMSchema },
    ]),
  ],
})
export class UserMModule {}
