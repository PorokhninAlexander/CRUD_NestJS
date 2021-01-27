import { Field, ObjectType } from '@nestjs/graphql';
import { GroupMType } from '../../group-m/dto/group-m-gql.dto';

@ObjectType()
export class UserMType {
  @Field(() => String)
  readonly _id: string;

  @Field()
  readonly user_name: string;

  @Field(() => [GroupMType], { nullable: true })
  readonly groups: GroupMType[];

  @Field(() => [UserMType], { nullable: true })
  readonly friends: UserMType[];
}
