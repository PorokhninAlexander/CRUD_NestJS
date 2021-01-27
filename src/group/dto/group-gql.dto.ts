import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../../user/dto/user-gql.dto';

@ObjectType()
export class GroupType {
  @Field(() => Number)
  readonly group_id: number;

  @Field(() => String, { nullable: true })
  readonly group_name: string;

  @Field(() => [UserType], { nullable: true })
  readonly members: UserType[];
}
