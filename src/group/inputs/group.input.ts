import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class GroupInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly group_name: string;

  @Field(() => [Int])
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  readonly members: number[];
}

@InputType()
export class GroupUpdateInput extends PartialType(GroupInput) {}
