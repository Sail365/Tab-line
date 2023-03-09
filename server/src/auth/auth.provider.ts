import { ReadOnlyUserDto } from './../users/dto/user.dto';
import { GoogleCreateDto } from './dto/google.create.dto';

export interface AuthenticationProvider {
  validateUser(details: GoogleCreateDto);
  createUser(details: GoogleCreateDto);
  updateUser(details: GoogleCreateDto): Promise<ReadOnlyUserDto>;
}
