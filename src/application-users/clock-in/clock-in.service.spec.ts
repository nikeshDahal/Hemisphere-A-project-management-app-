import { Test, TestingModule } from '@nestjs/testing';
import { ClockInService } from './clock-in.service';

describe('ClockInService', () => {
  let service: ClockInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClockInService],
    }).compile();

    service = module.get<ClockInService>(ClockInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
