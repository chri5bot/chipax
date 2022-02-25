import { Module } from '@nestjs/common';
import RickAndMortyModule from 'modules/rickAndMorty/rickAndMorty.module';

import ConfigModule from 'config/config.module';

import coreModules from './app.core';

export const featureModules = [
  // Feature modules here
  RickAndMortyModule,
];

@Module({
  imports: [ConfigModule, ...coreModules, ...featureModules],
})
export class AppModule {}
