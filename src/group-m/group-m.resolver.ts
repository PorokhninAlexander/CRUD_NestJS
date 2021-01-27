import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupMService } from './group-m.service';
import { GroupMType } from './dto/group-m-gql.dto';
import { GroupMInput, GroupMUpdateInput } from './inputs/group-m.input';

@Resolver()
export class GroupMResolver {
  constructor(private readonly groupMService: GroupMService) {}

  @Query(() => [GroupMType])
  async getAllGroupM() {
    return this.groupMService.findAll();
  }
  @Query(() => GroupMType)
  async getGroupM(@Args('id') id: string) {
    return this.groupMService.findOne(id);
  }

  @Mutation(() => GroupMType)
  async createGroupM(@Args('input') input: GroupMInput) {
    return this.groupMService.create(input);
  }

  @Mutation(() => GroupMType)
  async updateGroupM(
    @Args('input') input: GroupMUpdateInput,
    @Args('id') id: string,
  ) {
    return this.groupMService.update(id, input);
  }

  @Mutation(() => GroupMType)
  async removeGroupM(@Args('id') id: string) {
    return this.groupMService.remove(id);
  }
}
