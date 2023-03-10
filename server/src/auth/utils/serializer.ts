import { GoogleCreateDto } from './../dto/google.create.dto';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Done } from './types';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: GoogleCreateDto, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: GoogleCreateDto, done: Done) {
    const userDB = await this.authService.findUser(user.email);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
