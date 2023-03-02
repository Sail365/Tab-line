import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async finduser() {
    // return await this.userService.finduser();
    return 'Hello World!';
  }

  @Post()
  async create(@Body() body: UserRequestDto) {
    // return await this.userService.create();
    console.log(body);
    return 'Hello World!';
  }
}
