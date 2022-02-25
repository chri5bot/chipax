import { HttpException, HttpStatus } from '@nestjs/common';

export default class StardeosUserBirthdateWrong extends HttpException {
  constructor() {
    super(`Stardeos: Date wrong`, HttpStatus.BAD_REQUEST);
  }
}
