import { Test, TestingModule } from '@nestjs/testing';
import { BulkMessageService } from './bulk-message.service';

describe('BulkMessageService', () => {
  let service: BulkMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkMessageService],
    }).compile();

    service = module.get<BulkMessageService>(BulkMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
