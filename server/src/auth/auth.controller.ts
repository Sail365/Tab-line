import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/google.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth() {
    return await this.authService.googleLogin();
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  GoogleAuthRedirect(@Res() res) {
    res.send(200);
    // return this.authService.googleLogin(req.user);
  }
}
