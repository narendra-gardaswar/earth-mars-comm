import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MessageLog } from '../../earth-mars-comm/entity/message-log.entity';

export const sqliteConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'earth-mars-comm.db',
  entities: [MessageLog],
  synchronize: true, // Auto-create database schema
};
