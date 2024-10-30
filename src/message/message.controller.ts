/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { NotificationService } from './notification.service';
const Logger = require('robotic.js/src/interface/Logger') as any;
const logger = new Logger();

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private notification: NotificationService,
  ) {}

  @Post('send-email')
  async sendEmailNotification(@Body() body: { to: string; message: string }) {
    try {
      const { to, message } = body;
      logger.log(to, message);
      await this.notification.sendEmailNotification(to, message);
      return { success: true, message: 'Email notification request received' };
    } catch (error) {
      logger.error(error);
      return { success: false, error: 'Failed to send email notification' };
    }
  }
}
