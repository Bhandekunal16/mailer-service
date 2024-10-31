import { Body, Controller, Post } from '@nestjs/common';
import { BulkMessageService } from './bulk-message.service';
import { Localizer } from '../global/localizer';

@Controller('bulk-message')
export class BulkMessageController {
  constructor(private readonly bulkMessageService: BulkMessageService) {}
  private readonly Local = new Localizer();

  @Post('send-email')
  async sendEmailNotification(@Body() body: { email: string; unit: number }) {
    try {
      const { email, unit } = body;
      this.Local.logger.log(email + '' + unit);
      await this.bulkMessageService.sendEmailNotification(email, unit);
      return {
        status: true,
        msg: 'Email notification request received',
        statusCode: 200,
      };
    } catch (error) {
      this.Local.logger.error(error);
      return {
        success: false,
        error: 'Failed to send email notification',
        statusCode: 500,
      };
    }
  }
}
