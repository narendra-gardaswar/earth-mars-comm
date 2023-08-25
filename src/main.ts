import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvironmentVariable } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const port = configService.get<number>(EnvironmentVariable.PORT) || 3000;
  await app.listen(port, () => {
    logger.log(`http://localhost:${port}`);
  });
}
bootstrap();
