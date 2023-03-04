// import * as dotenv from 'dotenv';
// dotenv.config();
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'Google') {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    email: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.usersRepository.findByEmail(
      profile.emails[0].value,
    );
    if (user) {
      done(null, user);
    } else {
      const newUser = await this.usersRepository.create({
        email: profile.emails[0].value,
        name: profile.displayName,
        password: 'google',
      });
      done(null, newUser);
    }
  }
}
