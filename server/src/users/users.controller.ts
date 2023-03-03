import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersRequestDto } from './dto/users.request.dto';
import { ReadOnlyUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequstDto } from 'src/auth/dto/login.request.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get user' })
  @Get()
  async finduser() {
    return await this.usersService.finduser();
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyUserDto,
  })
  @Post()
  async create(@Body() body: UsersRequestDto) {
    return await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() body: LoginRequstDto) {
    return await this.authService.jwtLogIn(body);
  }
}
