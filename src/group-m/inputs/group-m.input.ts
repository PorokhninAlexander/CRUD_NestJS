import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class GroupMInput {
  @Field()
  @IsString()
  readonly group_name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly members: string[];
}

@InputType()
export class GroupMUpdateInput extends PartialType(GroupMInput) {}
