import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  providers: [Logger],
})
export class CoreModule {}
