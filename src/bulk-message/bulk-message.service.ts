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
  private text = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

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
    email: string,
    unit: number,
  ): Promise<{
    success?: boolean;
    res?: string;
    statusCode: number;
    message: string;
    status?: boolean;
  }> {
    try {
      for (let index = 0; index < unit; index++) {
        const subject = 'spam';
        const text = 'Boom';
        const html = `<div style="
                      color: #000;
                      font-weight: bold;
                      font-family: Arial, sans-serif;
                      text-align: center;
                      padding: 10px;
                      border: 2px solid #000;
                      display: inline-block;
                      line-height: 1.6;
                      width: 100dvw;
                      height: 55dvh;
                      background-image: url('https://wallpapercave.com/wp/wp8228968.png');
                      background-size: cover;
                      background-position: center;
                      background-repeat: no-repeat;
                      ">
                      <h1 style='border: 2px solid #fff; color: #fff; background-color: #000;'>Spam</h1>
                      <p>${Array.from(
                        { length: 12 },
                        () =>
                          this.text[
                            Math.floor(Math.random() * this.text.length)
                          ],
                      ).join('')}</p>
                      <p>${email}</p>
                    </div>`;
        await this.sendEmail(email, subject, text, html);
      }
    } catch (error) {
      return { res: error, status: false, statusCode: 500, message: 'error' };
    }
  }
}
