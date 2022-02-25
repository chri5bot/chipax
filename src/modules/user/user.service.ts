import { Injectable } from '@nestjs/common';
import AppLog from 'logger/logger.service';
import CHIPAXUserBirthdateWrong from './exceptions/CHIPAXUserBirthdateWrong';

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
  async userCHIPAXSignup(body: any) {
    if (!body.birthDate) {
      throw new CHIPAXUserBirthdateWrong();
    }

    if (!validateBirthdate(body.birthDate)) {
      throw new CHIPAXUserBirthdateWrong();
    }
  }
}
