import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { GroupType } from './dto/group-gql.dto';
import { GroupInput, GroupUpdateInput } from './inputs/group.input';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => [GroupType])
  async getAllGroup() {
    return this.groupService.findAll();
  }
  @Query(() => GroupType)
  async getGroup(@Args('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Mutation(() => GroupType)
  async createGroup(@Args('input') input: GroupInput) {
    return this.groupService.create(input);
  }

  @Mutation(() => GroupType)
  async updateGroup(
    @Args('input') input: GroupUpdateInput,
    @Args('id') id: number,
  ) {
    return this.groupService.update(id, input);
  }

  @Mutation(() => GroupType)
  async removeGroup(@Args('id') id: number) {
    return this.groupService.remove(id);
  }
}
