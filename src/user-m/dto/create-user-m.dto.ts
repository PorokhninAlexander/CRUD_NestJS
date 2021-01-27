import { GroupM } from '../../group-m/schemas/group-m.schema';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { UserM } from '../schemas/user-m.schema';

export class CreateUserMDto {
  @IsString()
  user_name: string;

  @IsArray()
  @IsOptional()
  groups: string[] | GroupM[];

  @IsArray()
  @IsOptional()
  friends: string[] | UserM[];
}
