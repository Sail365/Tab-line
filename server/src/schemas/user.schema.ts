import { SchemaFactory, Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  readonly readOnlyData: { _id: string; email: string; name: string };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
  };
});
