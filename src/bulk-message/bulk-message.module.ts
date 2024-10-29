import { Module } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';
import { BulkMessageController } from './bulk-message.controller';

@Module({
  controllers: [BulkMessageController],
  providers: [BulkMessageService],
})
export class BulkMessageModule {}
