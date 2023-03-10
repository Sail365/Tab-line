import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/user.repository';
import { LoginRequstDto } from './dto/login.request.dto';
import * as bcryipt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { GoogleCreateDto } from './dto/google.create.dto';
import { UsersRequestDto } from 'src/users/dto/users.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: GoogleCreateDto): Promise<any> {
    const { email } = data;
    const user = await this.findUser(email);
    if (user) {
      return user.readOnlyData;
    }
    return this.createUser(data);
  }

  createUser(data: GoogleCreateDto) {
    const { email, name, id } = data;
    const newUser = new UsersRequestDto();
    newUser.email = email;
    newUser.name = name;
    newUser.password = id;
    return this.usersService.create(newUser);
  }

  async findUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async jwtLogIn(data: LoginRequstDto) {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid: boolean = await bcryipt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    const payload = { email: user.email, sub: user._id };

    return {
      toekn: this.jwtService.sign(payload),
    };
  }

  async googleLogin() {}
}
