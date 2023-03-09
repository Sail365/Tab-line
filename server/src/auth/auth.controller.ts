import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/google.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth(@Res() res) {
    const url = await this.authService.googleLogin();
    res.writeHead(301, { Location: url });
  }
}
