import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any) {
    return {
      ip: req.socket.remoteAddress,
      family: req.socket._peername.family,
      port: req.socket._peername.port,
    };
  }
}
