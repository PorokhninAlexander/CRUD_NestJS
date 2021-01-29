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
  readonly group_name: string;

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly members: string[];
}

export class UpdateGroupMDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly group_name: string;

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly members: string[];
}
