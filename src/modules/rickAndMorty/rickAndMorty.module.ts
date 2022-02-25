import { Global, Module, HttpModule } from '@nestjs/common';
import RickAndMortyController from './rickAndMorty.controller';
import RickAndMortyService from './rickAndMorty.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RickAndMortyService],
  controllers: [RickAndMortyController],
  exports: [RickAndMortyService, HttpModule],
})
export default class RickAndMortyModule {}
