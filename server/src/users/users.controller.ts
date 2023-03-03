import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersRequestDto } from './dto/users.request.dto';
import { ReadOnlyUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
