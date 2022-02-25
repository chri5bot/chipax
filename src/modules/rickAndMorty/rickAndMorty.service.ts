import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import AppLog from 'logger/logger.service';

@Injectable()
export default class RickAndMortyService {
  constructor(
    private readonly log: AppLog,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.log.setContext(RickAndMortyService.name);
  }

  /**
   * Fetch Rick and Morty Characters
   */
  async fetchRickAndMortyCharacters(): Promise<any> {
    this.log.debug('Fetching rick and morty characters');

    try {
      const result = await this.httpService
        .get('https://rickandmortyapi.com/api/character')
        .toPromise();

      return result?.data;
    } catch (error) {
      this.log.error(error);
    }
  }
}
