import { Test, TestingModule } from '@nestjs/testing';
import { UserMController } from './user-m.controller';
import { UserMService } from './user-m.service';

describe('UserMController', () => {
  let controller: UserMController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMController],
      providers: [UserMService],
    }).compile();

    controller = module.get<UserMController>(UserMController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
