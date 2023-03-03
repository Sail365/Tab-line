import { PickType } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';

export class UsersRequestDto extends PickType(User, [
  'email',
  'name',
  'password',
] as const) {}
