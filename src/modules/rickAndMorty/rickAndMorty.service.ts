import { Injectable, HttpService } from '@nestjs/common';
import AppLog from 'logger/logger.service';
import {
  reduceArrayToString,
  charCounter,
  getLastItemUrl,
} from 'helpers/strings';

@Injectable()
export default class RickAndMortyService {
  constructor(private readonly log: AppLog, private httpService: HttpService) {
    this.log.setContext(RickAndMortyService.name);
  }

  /**
   * Fetch Rick and Morty Characters
   */
  async fetchRickAndMortyCharacters(page = 1): Promise<any> {
    this.log.debug(`Fetching rick and morty characters page n: ${page}`);
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
   * Fetch Rick and Morty Characters by ids
   */
  async fetchRickAndMortyCharactersById(ids): Promise<any> {
    this.log.debug(`Fetching rick and morty characters by ids: ${ids}`);
    try {
      const result = await this.httpService
        .get(`https://rickandmortyapi.com/api/character/${ids}`)
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
    this.log.debug(`Fetching rick and morty episodes page n: ${page}`);
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
    this.log.debug(`Fetching rick and morty locations page n: ${page}`);
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

    return Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });
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

    return Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });
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

    return Promise.all(promises)
      .then((pages) => {
        return [...pages, firstPage];
      })
      .catch((e) => {
        this.log.error(e);
      });
  }

  /**
   * Char counter exercise
   */
  async charCounterExercise(): Promise<any> {
    const exerciseName = 'Char Counter Exercise';
    this.log.debug(`${exerciseName}`);
    const start = Date.now();

    const allData = Promise.all([
      this.getAllLocations(),
      this.getAllEpisodes(),
      this.getAllCharacters(),
    ])
      .then((responses) => {
        return responses;
      })
      .catch((e) => {
        this.log.error(e);
      });

    const data = await allData;

    const location = { char: 'l', resource: 'location' };
    const reducedLocation = reduceArrayToString(
      data[0]?.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterLocations = charCounter(reducedLocation, location.char);

    const episode = { char: 'e', resource: 'episode' };
    const reducedEpisodes = reduceArrayToString(
      data[1]?.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterEpisodes = charCounter(reducedEpisodes, episode.char);

    const character = { char: 'c', resource: 'character' };
    const reducedCharacters = reduceArrayToString(
      data[2]?.map(({ results }) => results.map(({ name }) => name)),
    );
    const charCounterCharacters = charCounter(
      reducedCharacters,
      character.char,
    );

    const duration = Date.now() - start;

    return {
      exercise_name: 'Char counter',
      time: `${duration} ms`,
      in_time: 3000 >= duration,
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

  /**
   * episode Locations exercise
   */
  async episodeLocationsExercise(): Promise<any> {
    const exerciseName = 'Episode locations';
    this.log.debug(`${exerciseName}`);
    const start = Date.now();

    const allEpisodes = await this.getAllEpisodes();
    const test = allEpisodes.map(({ results }) =>
      results.map(({ name, episode, characters }) => {
        const characterIds = characters.map((character) =>
          getLastItemUrl(character),
        );

        return { name, episode, characters, characterIds };
      }),
    );

    const duration = Date.now() - start;

    return {
      exercise_name: exerciseName,
      time: `${duration} ms`,
      in_time: 3000 >= duration,
      test,
      results: [
        {
          name: 'Pickle Rick',
          episode: 'S03E03',
          locations: [
            'Earth (C-137)',
            'Earth (Replacement Dimension)',
            'unknown',
          ],
        },
      ],
    };
  }
}
