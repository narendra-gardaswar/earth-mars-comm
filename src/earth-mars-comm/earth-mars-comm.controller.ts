import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SendMessageDTO } from './dto/earth-mars-comm.dto';
import { EarthMarsCommService } from './earth-mars-comm.service';
import { Request } from 'express';
import { HeaderGuard } from '../shared/guards/header.guard';
import { MessageResponseInterceptor } from '../shared/Interceptors/message-response.interceptor';

@Controller('earth-mars-comm')
@UseGuards(HeaderGuard)
export class EarthMarsCommController {
  constructor(private readonly earthMarsCommService: EarthMarsCommService) {}

  @Post('/message')
  @UseInterceptors(MessageResponseInterceptor)
  sendMessage(@Body() body: SendMessageDTO, @Req() req: Request): string {
    return this.earthMarsCommService.sendMessage(body.message, req);
  }
}
