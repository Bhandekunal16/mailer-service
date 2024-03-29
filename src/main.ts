/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const Logger = require('robotic.js/interface/Logger') as any;
const Maintain = require('robotic.js/interface/maintain') as any;
const logger = new Logger();
const maintain = new Maintain();
require('dotenv').config();

logger.log(`host : ${process.env.LOCALHOST}`);

async function bootstrap() {
  maintain.log(`host : ${process.env.LOCALHOST}`);
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
