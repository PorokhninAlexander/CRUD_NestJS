import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  user_name: string;

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  groups: number[];

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  friends: number[];
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  user_name: string;

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  groups: number[];

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  friends: number[];
}
