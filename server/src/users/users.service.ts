import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRequestDto } from './dto/users.request.dto';
import * as bycript from 'bcrypt';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async finduser() {
    return 'Hello World!';
  }

  async create(body: UsersRequestDto) {
    const { email, name, password } = body;
    const isUserExist = await this.usersRepository.existsByEmail(email);
    if (isUserExist) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bycript.hash(password, 10);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
