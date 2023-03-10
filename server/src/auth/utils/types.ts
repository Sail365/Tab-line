import { GoogleCreateDto } from './../dto/google.create.dto';

export type Done = (err: Error, user: GoogleCreateDto) => void;
