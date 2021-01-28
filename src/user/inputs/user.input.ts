import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsArray, IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class UserInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  readonly user_name: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly groups: number[];

  @Field(() => [Int])
  @IsArray()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly friends: number[];
}

@InputType()
export class UpdateUpdateInput extends PartialType(UserInput) {}
