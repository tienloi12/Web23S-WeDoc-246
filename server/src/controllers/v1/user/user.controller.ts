import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  async getUsers() {
    let users = await this.userService.getUsers();
    return users;
  }

  @Get('info/:id')
  async getUserById(@Param(`id`) id: string) {
    let user = await this.userService.getUserById(id);
    return user;
  }

  @Get(':email')
  async getUserByEmail(@Param(`email`) email: string) {
    let user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Post('create')
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
