import { ExceptionFilter, HttpException } from '@nestjs/common';

/**
 * Throw nestjs http exceptions since fastify will catch them
 */
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    throw exception;
  }
}
