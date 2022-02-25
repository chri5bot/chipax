import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Request,
} from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';

import UserService from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'User API',
    tags: ['user'],
  })
  @Post('user/signup')
  async login(@Request() req) {
    return this.userService.userStardeosSignup(req.body);
  }
}
