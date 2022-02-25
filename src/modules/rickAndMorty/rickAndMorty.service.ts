import { Injectable, HttpService } from '@nestjs/common';
import AppLog from 'logger/logger.service';
import { reduceArrayToString, charCounter } from 'helpers/strings';

@Injectable()
export default class RickAndMortyService {
  constructor(private readonly log: AppLog, private httpService: HttpService) {
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
    const location = { char: 'l', resource: 'location' };
    const allLocations = await this.getAllLocations();
    const reducedLocation = reduceArrayToString(
      allLocations.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterLocations = charCounter(reducedLocation, location.char);

    const episode = { char: 'e', resource: 'episode' };
    const allEpisodes = await this.getAllEpisodes();
    const reducedEpisodes = reduceArrayToString(
      allEpisodes.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterEpisodes = charCounter(reducedEpisodes, episode.char);

    const character = { char: 'c', resource: 'character' };
    const allCharacters = await this.getAllEpisodes();
    const reducedCharacters = reduceArrayToString(
      allCharacters.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterCharacters = charCounter(
      reducedCharacters,
      character.char,
    );

    return {
      exercise_name: 'Char counter',
      time: '',
      in_time: true,
      results: [
        {
          char: location.char,
          count: charCounterLocations,
          resource: location.resource,
        },
        {
          char: episode.char,
          count: charCounterEpisodes,
          resource: episode.resource,
        },
        {
          char: character.char,
          count: charCounterCharacters,
          resource: character.resource,
        },
      ],
    };
  }
}
