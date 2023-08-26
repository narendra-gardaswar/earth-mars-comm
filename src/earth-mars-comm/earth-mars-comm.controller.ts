import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SendMessageDTO } from './dto/earth-mars-comm.dto';
import { EarthMarsCommService } from './earth-mars-comm.service';
import { Request } from 'express';
import { HeaderGuard } from '../shared/guards/header.guard';

@Controller('earth-mars-comm')
@UseGuards(HeaderGuard)
export class EarthMarsCommController {
  constructor(private readonly earthMarsCommService: EarthMarsCommService) {}

  @Post('/message')
  sendMessage(@Body() body: SendMessageDTO, @Req() req: Request): string {
    console.log(req['sender']);
    return this.earthMarsCommService.sendMessage(body.message, req);
  }
}
