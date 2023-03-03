import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    if (result) return true;
    else return false;
  }

  async create(user: UsersRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
