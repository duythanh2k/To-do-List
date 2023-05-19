import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard) // ensures LocalAuthGuard is run when this route hitted
  async login(@Request() req, @Response() res) {
    try {
      const accessToken = this.authService.signin(req.user);
      // make requests to login function and we should get our accessToken back in return
      return res.status(200).json(accessToken);
    } catch (err) {
      return res.status(403);
    }
  }
}
