import { PickType } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';

export class LoginRequstDto extends PickType(User, [
  'email',
  'password',
] as const) {}
