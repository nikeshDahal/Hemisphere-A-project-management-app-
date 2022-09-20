import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationUsersResolver } from './application-users.resolver';
import { ApplicationUsersService } from './application-users.service';

describe('ApplicationUsersResolver', () => {
  let resolver: ApplicationUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationUsersResolver, ApplicationUsersService],
    }).compile();

    resolver = module.get<ApplicationUsersResolver>(ApplicationUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
