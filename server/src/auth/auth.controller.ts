import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
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
  async redirect(@Res() res: Response, @CurrentUser() user) {
    const token = await this.authService.makeToken(user);
    console.log(token);
    res.redirect(`http://localhost:8080?token=${token}`);
  }
}
