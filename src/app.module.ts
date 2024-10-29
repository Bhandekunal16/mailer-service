import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { BulkMessageModule } from './bulk-message/bulk-message.module';

@Module({
  imports: [AuthModule, MessageModule, BulkMessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
