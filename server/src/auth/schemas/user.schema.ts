import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
});
