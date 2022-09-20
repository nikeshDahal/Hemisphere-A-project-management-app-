import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApplicationUsersService } from './application-users.service';
import { ApplicationUser } from './entities/application-user.entity';
import { CreateApplicationUserInput } from './dto/create-application-user.input';
import { UpdateApplicationUserInput } from './dto/update-application-user.input';

@Resolver(() => ApplicationUser)
export class ApplicationUsersResolver {
  constructor(private readonly applicationUsersService: ApplicationUsersService) {}

  @Mutation(() => ApplicationUser)
  createApplicationUser(@Args('createApplicationUserInput') createApplicationUserInput: CreateApplicationUserInput) {
    return this.applicationUsersService.create(createApplicationUserInput);
  }

  @Query(() => [ApplicationUser], { name: 'applicationUsers' })
  findAll() {
    return this.applicationUsersService.findAll();
  }

  @Query(() => ApplicationUser, { name: 'applicationUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.applicationUsersService.findOne(id);
  }

  @Mutation(() => ApplicationUser)
  updateApplicationUser(@Args('updateApplicationUserInput') updateApplicationUserInput: UpdateApplicationUserInput) {
    return this.applicationUsersService.update(updateApplicationUserInput.id, updateApplicationUserInput);
  }

  @Mutation(() => ApplicationUser)
  removeApplicationUser(@Args('id', { type: () => Int }) id: number) {
    return this.applicationUsersService.remove(id);
  }
}
