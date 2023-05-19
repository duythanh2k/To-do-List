import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne({ username });

    if (!user || user?.password === null) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return {
        user_id: user.user_id,
        username: user.username,
      };
    }

    return null;
  }

  async signin(user: Omit<User, 'password'> | null) {
    if (!user) {
      throw new Error('Invalid User');
    }

    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
