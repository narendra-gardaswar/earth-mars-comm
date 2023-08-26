import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EarthMarsCommModule } from './earth-mars-comm/earth-mars-comm.module';
import { LogMiddleware } from './shared/middlewares/log.middleware';

@Module({
  imports: [CoreModule, EarthMarsCommModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
