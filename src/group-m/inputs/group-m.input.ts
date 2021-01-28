import { Field, InputType, PartialType } from '@nestjs/graphql';
import {IsArray, IsMongoId, IsOptional, IsString, Length} from 'class-validator';

@InputType()
export class GroupMInput {
  @Field()
  @IsString()
  readonly group_name: string;

  @Field(() => [String])
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly members: string[];
}

@InputType()
export class GroupMUpdateInput extends PartialType(GroupMInput) {}
