import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsArray, IsMongoId,
  IsOptional,
  IsString,
  Length,
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
  @IsMongoId({ each: true })
  @IsOptional()
  readonly groups: string[];

  @Field(() => [String])
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly friends: string[];
}

@InputType()
export class UserMUpdateInput extends PartialType(UserMInput) {}
