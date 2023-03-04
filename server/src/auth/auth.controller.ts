import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('Google'))
  private googleAuth(@Req() req) {
    return;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('Google'))
  private GoogleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
