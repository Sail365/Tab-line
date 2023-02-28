import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../schema/user.schema';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const users: User[] = [];

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        { provide: getModelToken(User.name), useFactory: () => {} },
      ],
    }).compile();

    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('유저정보 전체 조회', () => {
    it('유저정보 전체 조회', async () => {
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);
      const result = await userService.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
