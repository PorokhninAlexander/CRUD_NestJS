import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class GroupInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly group_name: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  readonly members: number[];
}

@InputType()
export class GroupUpdateInput extends PartialType(GroupInput) {}
