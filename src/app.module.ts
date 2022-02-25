import { Module } from '@nestjs/common';
import UserModule from 'modules/user/user.module';

import ConfigModule from 'config/config.module';

import coreModules from './app.core';

export const featureModules = [
  // Feature modules here
  UserModule,
];

@Module({
  imports: [ConfigModule, ...coreModules, ...featureModules],
})
export class AppModule {}
