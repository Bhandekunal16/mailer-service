import { Body, Controller, Post } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';
const Logger = require('robotic.js/interface/Logger') as any;
const logger = new Logger();

@Controller('bulk-message')
export class BulkMessageController {
  constructor(private readonly bulkMessageService: BulkMessageService) {}


  @Post('send-email')
  async sendEmailNotification(@Body() body: { to: string; message: string }) {
    try {
      const { to, message } = body;
      logger.log(to, message);
      await this.bulkMessageService.sendEmailNotification(to, message);
      return { success: true, message: 'Email notification request received' };
    } catch (error) {
      logger.error(error);
      return { success: false, error: 'Failed to send email notification' };
    }
  }
}
