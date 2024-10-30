import { Body, Controller, Post } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';
const Logger = require('robotic.js/src/interface/Logger') as any;
const logger = new Logger();

@Controller('bulk-message')
export class BulkMessageController {
  constructor(private readonly bulkMessageService: BulkMessageService) {}

  @Post('send-email')
  async sendEmailNotification(@Body() body: { email: string; unit: number }) {
    try {
      const { email, unit } = body;
      logger.log(email, unit);
      await this.bulkMessageService.sendEmailNotification(email, unit);
      return {
        status: true,
        msg: 'Email notification request received',
        statusCode: 200,
      };
    } catch (error) {
      logger.error(error);
      return { success: false, error: 'Failed to send email notification', statusCode: 500 };
    }
  }
}
