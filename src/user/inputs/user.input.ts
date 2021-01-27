import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field(() => String)
  @IsString()
  @MinLength(2)
  readonly user_name: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  readonly groups: number[];

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  readonly friends: number[];
}

@InputType()
export class UpdateUpdateInput extends PartialType(UserInput) {}
