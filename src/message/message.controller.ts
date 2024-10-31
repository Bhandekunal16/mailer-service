/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Post, Body } from '@nestjs/common';

import { NotificationService } from './notification.service';
import { Localizer } from '../global/localizer';

@Controller('message')
export class MessageController {
  constructor(private readonly notification: NotificationService) {}
  private Local = new Localizer();

  @Post('send-email')
  async sendEmailNotification(@Body() body: { to: string; message: string }) {
    try {
      const { to, message } = body;
      this.Local.logger.log(to + message);
      await this.notification.sendEmailNotification(to, message);
      return { success: true, message: 'Email notification request received' };
    } catch (error) {
      this.Local.logger.error(error);
      return { success: false, error: 'Failed to send email notification' };
    }
  }
}
