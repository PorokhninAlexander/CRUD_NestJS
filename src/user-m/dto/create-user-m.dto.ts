import {
  IsArray, IsMongoId,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserMDto {
  @IsString()
  @MinLength(3)
  user_name: string;

  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  @IsOptional()
  groups: string[];

  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  @IsOptional()
  friends: string[];
}

export class UpdateUserMDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly user_name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly groups: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly friends: string[];
}
