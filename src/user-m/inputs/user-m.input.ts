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

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly groups: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @Field(() => [String], { nullable: true })
  readonly friends: string[];
}

@InputType()
export class UserMUpdateInput extends PartialType(UserMInput) {}
