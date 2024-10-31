/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Localizer } from './global/localizer';
require('dotenv').config();

new Localizer().logger.log(`host : ${process.env.LOCALHOST}`);

async function bootstrap() {
  new Localizer().maintain.log(`host : ${process.env.LOCALHOST}`);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.LOCALHOST);
}
bootstrap();
