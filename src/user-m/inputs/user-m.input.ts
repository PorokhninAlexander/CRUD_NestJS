import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class UserMInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly user_name: string;

  @Field(() => [String])
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly groups: string[];

  @Field(() => [String])
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly friends: string[];
}

@InputType()
export class UserMUpdateInput extends PartialType(UserMInput) {}
