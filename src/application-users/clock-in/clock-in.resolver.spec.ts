import { Test, TestingModule } from '@nestjs/testing';
import { ClockInResolver } from './clock-in.resolver';
import { ClockInService } from './clock-in.service';

describe('ClockInResolver', () => {
  let resolver: ClockInResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClockInResolver, ClockInService],
    }).compile();

    resolver = module.get<ClockInResolver>(ClockInResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
