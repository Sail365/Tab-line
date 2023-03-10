import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/google.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('http://localhost:8080');
  }
}
