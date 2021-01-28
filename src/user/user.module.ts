import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Group } from '../group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
