import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('Google'))
  googleAuth(@Req() req) { }

  @Get('google/redirect')
  @UseGuards(AuthGuard('Google'))
  GoogleAuthRedirect(@Req() req) { }
}
