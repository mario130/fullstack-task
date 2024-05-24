import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
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
    email = email.trim().toLowerCase();
    name = name.trim();

    if (!this.isValidPassword(password)) {
      throw new BadRequestException(
        'Password does not meet complexity requirements',
      );
    }

    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

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

  private isValidPassword(password: string): boolean {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isValidLength = password.length >= 8;
    return hasLetter && hasNumber && hasSpecialChar && isValidLength;
  }
}
