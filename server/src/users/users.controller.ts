import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async finduser() {
    return await this.usersService.finduser();
  }

  @Post()
  async create(@Body() body: UsersRequestDto) {
    return await this.usersService.create(body);
  }
}
