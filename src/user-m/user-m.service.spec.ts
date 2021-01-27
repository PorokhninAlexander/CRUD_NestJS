import { Test, TestingModule } from '@nestjs/testing';
import { UserMService } from './user-m.service';

describe('UserMService', () => {
  let service: UserMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMService],
    }).compile();

    service = module.get<UserMService>(UserMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
