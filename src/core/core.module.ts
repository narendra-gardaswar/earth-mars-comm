import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqliteConfig } from './database/sqlite.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(sqliteConfig),
  ],
  providers: [Logger],
})
export class CoreModule {}
