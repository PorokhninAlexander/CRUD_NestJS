//
// export class CreateUserDto {
//   @String()
//   user_name: string;
// }

import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../entity/user.entity';
import { Group } from '../../group/entities/group.entity';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsOptional()
  @IsArray()
  groups: number[] | Group[] | null;

  @IsOptional()
  @IsArray()
  friends: number[] | User[] | null;
}
