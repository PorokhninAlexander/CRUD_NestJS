import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entity/user.entity';

export class CreateGroupDto {
  @IsString()
  group_name: string;

  @IsArray()
  @IsOptional()
  members: number[] | User[];
}
