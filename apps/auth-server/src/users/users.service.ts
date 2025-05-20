import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserEntity, UserDocument } from './entities/user.entity';
import { Role } from '@common/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) {}

  async create(userData: { email: string; password: string; role: Role }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser = new this.userModel({
      email: userData.email,
      password: hashedPassword,
      role: userData.role ?? Role.USER,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
