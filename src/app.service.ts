import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(@Req() req: any) {
    return {
      data: 'Hello World!',
      ip: req.socket.remoteAddress,
      port: req.socket._peername.port,
      family: req.socket._peername.family,
    };
  }
}
