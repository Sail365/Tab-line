import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '64014d694d82c300f55c5528',
    description: 'User id',
  })
  id: string;
}
