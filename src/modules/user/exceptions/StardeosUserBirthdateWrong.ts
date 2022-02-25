import { HttpException, HttpStatus } from '@nestjs/common';

export default class CHIPAXUserBirthdateWrong extends HttpException {
  constructor() {
    super(`CHIPAX: Date wrong`, HttpStatus.BAD_REQUEST);
  }
}
