import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserMService } from './user-m.service';
import { UserMType } from './dto/user-m-gql.dto';
import { UserMInput, UserMUpdateInput } from './inputs/user-m.input';

@Resolver()
export class UserMResolver {
  constructor(private readonly userMService: UserMService) {}

  @Query(() => [UserMType])
  async getAllUserM() {
    return this.userMService.findAll();
  }

  @Query(() => UserMType)
  async getUserM(@Args('id') id: string) {
    return this.userMService.findOne(id);
  }

  @Mutation(() => UserMType)
  async createUserM(@Args('input') input: UserMInput) {
    return this.userMService.create(input);
  }

  @Mutation(() => UserMType)
  async updateUserM(
    @Args('input') input: UserMUpdateInput,
    @Args('id') id: string,
  ) {
    return this.userMService.update(id, input);
  }

  @Mutation(() => UserMType)
  async removeUserM(@Args('id') id: string) {
    return this.userMService.remove(id);
  }
}
