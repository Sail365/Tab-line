import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/user.repository';
import { LoginRequstDto } from './dto/login.request.dto';
import * as bcryipt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
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
}
