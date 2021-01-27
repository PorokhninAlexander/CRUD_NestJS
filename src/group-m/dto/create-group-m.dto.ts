import { UserM } from '../../user-m/schemas/user-m.schema';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGroupMDto {
  @IsString()
  group_name: string;

  @IsArray()
  @IsOptional()
  members: string[] | UserM[];
}
