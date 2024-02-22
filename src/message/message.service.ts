/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './mailer.config';
const Logger = require('robotic.js/interface/Logger') as any;
const logger = new Logger();
const Maintain = require('robotic.js/interface/maintain') as any;
const maintain = new Maintain();

@Injectable()
export class MessageService {
  private transporter: nodemailer.Transporter;

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
      await this.transporter.sendMail(mailOptions);
      await maintain.log(
        `mail send to ${mailOptions.to} from ${mailOptions.from}`,
      );
    } catch (error) {
      logger.error(error);
      return { res: error, statusCode: 500, status: false, message: 'error' };
    }
  }
}
