import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UsersRequestDto } from './dto/users.request.dto';
import * as bycript from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async finduser() {
    return 'Hello World!';
  }

  async create(body: UsersRequestDto) {
    const { email, name, password } = body;
    const isUserExist = await this.userModel.exists({ email });
    if (isUserExist) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bycript.hash(password, 10);
    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
