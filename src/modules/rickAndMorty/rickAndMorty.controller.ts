import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';

import RickAndMortyService from './rickAndMorty.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export default class RickAndMortyController {
  constructor(private readonly rickAndMortyService: RickAndMortyService) {}

  @ApiOperation({
    description: 'Rick and Morty API',
    tags: ['rick-and-morty'],
  })
  @Get('rick-and-morty/character')
  async character() {
    return this.rickAndMortyService.fetchRickAndMortyCharacters();
  }
}
