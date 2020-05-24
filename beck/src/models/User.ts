import mongoose, { Schema, Document } from "mongoose";
import isEmail from 'validator/lib/isEmail'

export interface IUser extends Document {
  email: string,
  fullname: string,
  password: string,
  confirmed: boolean,
  avatar: string,
  confirm_hash: string,
  last_seen: Date
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: 'email adress is required',
      validate: [isEmail, 'Invalid email'],
      unique: true
    },
    avatar: String,
    fullname: {
      type: String,
      required: 'Fullname adress is required'
    },
    password: {
      type: String,
      required: 'Password adress is required'
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    confirm_hash: String,
    last_seen: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
