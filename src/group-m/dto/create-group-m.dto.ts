import {
  IsArray, IsMongoId,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateGroupMDto {
  @IsString()
  @MinLength(3)
  group_name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  members: string[];
}

export class UpdateGroupMDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  group_name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  members: string[];
}
