import { Test, TestingModule } from '@nestjs/testing';
import { GroupMController } from './group-m.controller';
import { GroupMService } from './group-m.service';

describe('GroupMController', () => {
  let controller: GroupMController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMController],
      providers: [GroupMService],
    }).compile();

    controller = module.get<GroupMController>(GroupMController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
