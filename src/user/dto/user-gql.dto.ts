import { Field, ObjectType } from '@nestjs/graphql';
import { GroupType } from '../../group/dto/group-gql.dto';

@ObjectType()
export class UserType {
  @Field(() => Number, { nullable: true })
  readonly user_id: number;

  @Field(() => String)
  readonly user_name: string;

  @Field(() => [GroupType], { nullable: true })
  readonly groups: GroupType[];

  @Field(() => [UserType], { nullable: true })
  readonly friends: UserType[];
}
