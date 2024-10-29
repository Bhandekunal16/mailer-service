import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './util/mailer.config';
const Logger = require('robotic.js/interface/Logger') as any;
const logger = new Logger();
const Maintain = require('robotic.js/interface/maintain') as any;
const maintain = new Maintain();

@Injectable()
export class BulkMessageService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig.transport);
  }

  private async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    const mailOptions = {
      from: mailerConfig.transport.auth.user,
      to,
      subject,
      text,
      html,
      replyTo: 'no-reply@gmail.com',
    };

    try {
      await this.transporter.sendMail(mailOptions);
      await maintain.log(
        `mail send to ${mailOptions.to} from ${mailOptions.from}`,
      );
    } catch (error) {
      logger.error(error);
      return { res: error, statusCode: 500, status: false, message: 'error' };
    }
  }

  public async sendEmailNotification(
    to: string,
    message: string,
  ): Promise<{
    success?: boolean;
    res?: string;
    statusCode: number;
    message: string;
    status?: boolean;
  }> {
    try {
      const subject = 'Robotic';
      const text = message;
      const html = `<p>${message}</p>`;

      if (text !== undefined) {
        await this.sendEmail(to, subject, text, html);
        return {
          success: true,
          statusCode: 200,
          message: 'Email notification sent successfully',
        };
      } else
        return {
          status: false,
          statusCode: 404,
          message: 'email not send due to message',
        };
    } catch (error) {
      return { res: error, status: false, statusCode: 500, message: 'error' };
    }
  }
}
