import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
