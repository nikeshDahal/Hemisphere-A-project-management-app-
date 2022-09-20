import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationUsersService } from './application-users.service';

describe('ApplicationUsersService', () => {
  let service: ApplicationUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationUsersService],
    }).compile();

    service = module.get<ApplicationUsersService>(ApplicationUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
