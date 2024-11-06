import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './util/mailer.config';
import { Localizer } from '../global/localizer';

@Injectable()
export class BulkMessageService {
  private readonly transporter: nodemailer.Transporter;
  private readonly text = [
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

  private readonly Local = new Localizer();

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

  public async sendEmailNotification(
    email: string,
    unit: number,
    message: string,
  ): Promise<{
    success?: boolean;
    res?: string;
    statusCode: number;
    message: string;
    status?: boolean;
  }> {
    try {
      const subject = 'spam';
      const text = 'Boom';

      const tasks = Array.from({ length: unit }, async () => {
        const html =
          message == ''
            ? `<div style="
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
                          </div>`
            : `<p>${message}<p>`;

        return this.sendEmail(email, subject, text, html);
      });

      await Promise.all(tasks);
    } catch (error) {
      return { res: error, status: false, statusCode: 500, message: 'error' };
    }
  }
}
