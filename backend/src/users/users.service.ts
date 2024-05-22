import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
