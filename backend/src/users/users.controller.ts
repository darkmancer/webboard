import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  async signIn(@Body() body: { username: string }) {
    return this.usersService.signIn(body.username);
  }
}
