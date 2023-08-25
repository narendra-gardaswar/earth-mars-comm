import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EarthMarsCommModule } from './earth-mars-comm/earth-mars-comm.module';

@Module({
  imports: [CoreModule, EarthMarsCommModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
