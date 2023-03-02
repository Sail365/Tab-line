import { SchemaFactory, Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
