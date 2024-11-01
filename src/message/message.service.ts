/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './mailer.config';
import { Localizer } from '../global/localizer';

@Injectable()
export class MessageService {
  private readonly transporter: nodemailer.Transporter;
  private readonly Local = new Localizer();

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig.transport);
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: mailerConfig.transport.auth.user,
      to,
      subject,
      text,
      html,
    };

    try {
      await Promise.all([
        this.transporter.sendMail(mailOptions),
        this.Local.maintain.log(
          `mail send to ${mailOptions.to} from ${mailOptions.from}`,
        ),
      ]);
    } catch (error) {
      this.Local.logger.error(error);
      return { res: error, statusCode: 500, status: false, message: 'error' };
    }
  }
}
