import { Field, ObjectType } from '@nestjs/graphql';
import { UserMType } from '../../user-m/dto/user-m-gql.dto';

@ObjectType()
export class GroupMType {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  readonly group_name: string;

  @Field(() => [UserMType], { nullable: true })
  readonly members: UserMType[];
}
