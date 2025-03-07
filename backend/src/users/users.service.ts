import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string) {
    const user = await this.usersRepo.findOne(username);
    const payload = { sub: user.id, username: user.username, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async findOneByUsername(username: string) {
    return this.usersRepo.findOne(username);
  }
}
