import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, File } from 'src/schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async createFile(file: File): Promise<File | any> {
    try {
      let data: any;
      data = await this.fileModel.create(file);
      return data as File;
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
}
