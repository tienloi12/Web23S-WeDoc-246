import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/all')
  async getUsers() {
    let users = await this.userService.getUsers();
    return users;
  }

  @Get()
  async getUserById(@Query('id') id: string) {
    let user = await this.userService.getUserById(id);
    return user;
  }

  @Post()
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
