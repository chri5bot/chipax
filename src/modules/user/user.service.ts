import { Injectable } from '@nestjs/common';
import AppLog from 'logger/logger.service';
import StardeosUserBirthdateWrong from './exceptions/StardeosUserBirthdateWrong';

import validateBirthdate from 'helpers/validateBirthdate';

@Injectable()
export default class UserService {
  constructor(private readonly log: AppLog) {
    this.log.setContext(UserService.name);
  }

  /**
   * Signup user
   * @param {body} body
   */
  async userStardeosSignup(body: any) {
    if (!body.birthDate) {
      throw new StardeosUserBirthdateWrong();
    }

    if (!validateBirthdate(body.birthDate)) {
      throw new StardeosUserBirthdateWrong();
    }
  }
}
