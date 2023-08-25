import { ConfigModuleOptions } from '@nestjs/config';

export enum EnvironmentVariable {
  PORT = 'PORT',
}

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
};
