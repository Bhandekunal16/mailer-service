import { Test, TestingModule } from '@nestjs/testing';
import { BulkMessageController } from './bulk-message.controller';
import { BulkMessageService } from './bulk-message.service';

describe('BulkMessageController', () => {
  let controller: BulkMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkMessageController],
      providers: [BulkMessageService],
    }).compile();

    controller = module.get<BulkMessageController>(BulkMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
