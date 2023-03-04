import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/user.repository';
import { LoginRequstDto } from './dto/login.request.dto';
import * as bcryipt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { GoogleCreateDto } from './dto/google.create.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  // async googleLogin(data: User) {
  //   const { email, name } = data;
  //   const payload = { email, sub: name };
  //   return {
  //     toekn: this.jwtService.sign(payload),
  //   };
  // }
}
