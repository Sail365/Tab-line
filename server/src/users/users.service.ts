import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async finduser() {
    return 'Hello World!';
  }

  async create(user: UsersRequestDto) {
    return user;
  }
}
