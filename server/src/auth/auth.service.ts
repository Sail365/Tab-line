import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
}
