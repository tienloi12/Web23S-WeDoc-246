import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async createFile(file: File): Promise<File | any> {
    try {
      let data = await this.fileModel.create(file);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateFile(fileId: string, file: File): Promise<File | any> {
    try {
      let data = await this.fileModel
        .findOneAndUpdate({ fileId: fileId }, file)
        .exec();
        console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  async getFileById(fileId: string): Promise<File | any> {
    try {
      let data = await this.fileModel.findOne({ fileId: fileId }).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async getFiles(): Promise<File[] | null> {
    try {
      let data = await this.fileModel.find().exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  async getFilesByAuthorId(authorId: string): Promise<File[] | null> {
    try {
      let data = await this.fileModel.find({ authorId: authorId }).exec();
      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
    }
  }
}
