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
  async fetchRickAndMortyLocations(page = 1): Promise<any> {
    this.log.debug('Fetching rick and morty locations');

    try {
      const result = await this.httpService
        .get(`https://rickandmortyapi.com/api/location?page=${page}`)
        .toPromise();

      return result?.data;
    } catch (error) {
      this.log.error(error);
    }
  }

  /**
   * Char counter exercise
   */
  async charCounterExercise(): Promise<any> {
    this.log.debug('Char Counter Exercise');

    const locations = await this.fetchRickAndMortyLocations();
    const locationPages = locations?.info?.pages;

    const locationPromises = [];
    for (let i = 1; i <= locationPages; i++) {
      locationPromises.push(this.fetchRickAndMortyLocations(i));
    }

    const locationNames = Promise.all(locationPromises)
      .then((locations) => {
        return locations.map(({ results }) => results.map(({ name }) => name));
      })
      .catch((e) => {
        this.log.error(e);
      });

    return locationNames;
  }
}
