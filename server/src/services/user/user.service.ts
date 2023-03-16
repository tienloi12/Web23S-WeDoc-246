import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    try {
      let data = await this.userModel.findOne({ email: email }).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async createUser(user: User): Promise<User | any> {
    try {
      const isExist = await this.userModel.findOne({ email: user.email });
      if (!isExist) {
        let newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          documentFiles: [],
        };
        let data = await this.userModel.create(newUser);
        return data;
      } else {
        throw new HttpException('User already exits', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
