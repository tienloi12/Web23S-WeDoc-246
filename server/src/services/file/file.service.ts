import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async getFiles(): Promise<File[] | null> {
    try {
      let data = await this.fileModel.find().exec();
      return data;
    } catch (error) {
      return null;
    }
  }
}
