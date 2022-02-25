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
  async fetchRickAndMortyCharacters(page = 1): Promise<any> {
    this.log.debug('Fetching rick and morty characters');
    try {
      const result = await this.httpService
        .get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .toPromise();
      return result?.data;
    } catch (error) {
      this.log.error(error);
    }
  }

  /**
   * Fetch Rick and Morty Episodes
   */
  async fetchRickAndMortyEpisodes(page = 1): Promise<any> {
    this.log.debug('Fetching rick and morty episodes');
    try {
      const result = await this.httpService
        .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
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
    } catch (error) {}
  }

  /**
   * Get all locations of each page
   */
  async getAllLocations(): Promise<any> {
    this.log.debug(`Get all locations`);
    const firstPage = await this.fetchRickAndMortyLocations();
    const numberPages = firstPage?.info?.pages;
    const promises = [];

    for (let i = 2; i <= numberPages; i++) {
      promises.push(this.fetchRickAndMortyLocations(i));
    }

    const result = Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });

    return result;
  }

  /**
   * Get all characters of each page
   */
  async getAllCharacters(): Promise<any> {
    this.log.debug(`Get all characters`);
    const firstPage = await this.fetchRickAndMortyCharacters();
    const numberPages = firstPage?.info?.pages;
    const promises = [];

    for (let i = 2; i <= numberPages; i++) {
      promises.push(this.fetchRickAndMortyCharacters(i));
    }

    const result = Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });

    return result;
  }

  /**
   * Get all episodes of each page
   */
  async getAllEpisodes(): Promise<any> {
    this.log.debug(`Get all episodes`);

    const firstPage = await this.fetchRickAndMortyEpisodes();
    const numberPages = firstPage?.info?.pages;
    const promises = [];

    for (let i = 2; i <= numberPages; i++) {
      promises.push(this.fetchRickAndMortyEpisodes(i));
    }

    const result = Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });

    return result;
  }

  /**
   * Char counter exercise
   */
  async charCounterExercise(): Promise<any> {
    this.log.debug('Char Counter Exercise');

    const allLocations = await this.getAllLocations();
    const allCharacters = await this.getAllCharacters();
    const allEpisodes = await this.getAllEpisodes();

    return allCharacters;
  }
}
