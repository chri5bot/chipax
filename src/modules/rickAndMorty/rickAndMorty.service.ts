import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import AppLog from 'logger/logger.service';

@Injectable()
export default class RickAndMortyService {
  constructor(
    private readonly log: AppLog,
    private httpService: HttpService,
    private configService: ConfigService, // TODO: add rick and morty api in env file
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

  /**
   * Fetch Rick and Morty Episodes
   */
  async fetchRickAndMortyEpisodes(): Promise<any> {
    this.log.debug('Fetching rick and morty episodes');

    try {
      const result = await this.httpService
        .get('https://rickandmortyapi.com/api/episode')
        .toPromise();

      return result?.data;
    } catch (error) {
      this.log.error(error);
    }
  }

  /**
   * Fetch Rick and Morty Locations
   */
  async fetchRickAndMortyLocations(): Promise<any> {
    this.log.debug('Fetching rick and morty locations');

    try {
      const result = await this.httpService
        .get('https://rickandmortyapi.com/api/location')
        .toPromise();

      return result?.data;
    } catch (error) {
      this.log.error(error);
    }
  }
}
