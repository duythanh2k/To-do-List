import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findOne(@Query('username') username: string) {
    return this.usersService.findOne({ username });
  }
}
