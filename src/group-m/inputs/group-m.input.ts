import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GroupMInput {
  @Field()
  @IsString()
  readonly group_name: string;

  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  readonly members: string[];
}

@InputType()
export class GroupMUpdateInput extends PartialType(GroupMInput) {}
