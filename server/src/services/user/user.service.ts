import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[] | null> {
    try {
      let data = await this.userModel.find().exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async getUserById(uid: string): Promise<User | null> {
    try {
      let data = await this.userModel.findOne({ uid: uid }).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      let data = await this.userModel.findOne({ email: email }).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async createUser(user: User): Promise<User | any> {
    try {
      let data: any;
      data = await this.userModel.create(user);
      return data as User;
    } catch (error) {
      return null;
    }
  }
}
