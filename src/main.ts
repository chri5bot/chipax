import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import Logger from './logger/logger.service';

import { HttpExceptionFilter } from 'lib/http/httpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.useLogger(await app.resolve(Logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService: ConfigService = app.get(ConfigService);

  const docsTitle = process.env.APPLICATION_NAME || 'STARDEOS';

  const docsDescription = process.env.APPLICATION_DESCRIPTION || 'STARDEOS';

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(docsTitle)
    .setDescription(docsDescription)
    .setVersion(process.env.APPLICATION_VERSION || '1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(
    configService.get<number>('http.port'),
    configService.get<string>('http.host'),
  );
}

bootstrap();
