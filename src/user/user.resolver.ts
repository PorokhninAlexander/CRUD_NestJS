import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/user-gql.dto';
import { UpdateUpdateInput, UserInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async getAllUser() {
    return this.userService.findAll();
  }

  @Query(() => UserType)
  async getUser(@Args('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('input') input: UpdateUpdateInput,
    @Args('id') id: number,
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
  async removeUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
