import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import httpConfig from './service/http';

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [httpConfig],
      isGlobal: true,
    }),
  ],
})
export default class ConfigModule {}
