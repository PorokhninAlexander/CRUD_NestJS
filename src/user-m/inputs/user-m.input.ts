import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserMInput {
  @Field()
  @IsString()
  readonly user_name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  readonly groups: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  readonly friends: string[];
}

@InputType()
export class UserMUpdateInput extends PartialType(UserMInput) {}
