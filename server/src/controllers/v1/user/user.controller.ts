import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { check } from 'prettier';
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
    let checkUser = await this.getUserById(user.uid);
    console.log(checkUser);
    if (!checkUser) {
      console.log('User does not exist, creating user...');
      return this.userService.createUser(user);
    }
    console.log('User already exists, returning user...');
    return user;
  }
}
