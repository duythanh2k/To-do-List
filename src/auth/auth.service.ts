import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(username: string, pass: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({username, password: hashedPassword})
    const payload = { sub: user.user_id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne({ username });
    if (!user || !user?.password) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.user_id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
