import { Module } from '@nestjs/common';
import { EarthMarsCommController } from './earth-mars-comm.controller';
import { EarthMarsCommService } from './earth-mars-comm.service';

@Module({
  controllers: [EarthMarsCommController],
  providers: [EarthMarsCommService],
})
export class EarthMarsCommModule {}
