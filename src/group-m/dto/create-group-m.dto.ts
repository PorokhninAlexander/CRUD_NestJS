import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateGroupMDto {
  @IsString()
  @MinLength(3)
  group_name: string;

  @IsArray()
  @ArrayUnique()
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
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  members: string[];
}
