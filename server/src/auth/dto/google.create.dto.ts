import { PickType } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';

export class GoogleCreateDto extends PickType(User, [
  'email',
  'name',
  'id',
] as const) {}
