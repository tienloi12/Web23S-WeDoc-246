import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  // CREATE FILE
  async createFile(file: File): Promise<File | any> {
    try {
      let data = await this.fileModel.create(file);
      return { data, message: 'File saved successfully' };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // UPDATE FILE
  async updateFile(fileId: string, file: File): Promise<File | any> {
    try {
      let updateFile = await this.fileModel
        .findOneAndUpdate({ fileId: fileId }, file, { new: true })
        .exec();
      return { updateFile, message: 'File updated successfully' };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
    }
  }

  // GET FILE DETAIL
  async getFileById(fileId: string): Promise<File | any> {
    try {
      let data = await this.fileModel.findOne({ fileId: fileId }).exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  // GET FILES
  async getFiles(): Promise<File[] | null> {
    try {
      let data = await this.fileModel.find().exec();
      return data;
    } catch (error) {
      return null;
    }
  }

  // GET FILES BY AUTHOR ID
  async getFilesByAuthorId(authorId: string): Promise<File[] | null> {
    try {
      let data = await this.fileModel.find({ authorId: authorId }).exec();
      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
    }
  }

  async deleteFileById(fileId: string): Promise<string | null> {
    try {
      await this.fileModel.deleteOne({ fileId: fileId }).exec();
      return 'File deleted successfully';
    } catch (error) {
      ('File deleted successfully');
    }
  }

  // INVITE collaborator
  async inviteCollaborator(file: FileDocument, uid: string) {
    try {
      // check if user is already a collaborator
      let isCollab = file.collaborators.find((collab) => collab == Object(uid));

      if (!isCollab) {
        if (file.collaborators.length > 0) {
          let newCollab = file.collaborators;
          let newFile: File = {
            fileId: file.fileId,
            authorId: file.authorId,
            title: file.title,
            content: file.content,
            collaborators: newCollab,
          };
          return await this.fileModel
            .findOneAndUpdate({ _id: file._id }, newFile, { new: true })
            .exec();
        } else {
          return null;
        }
      } else {
        console.log(Object(uid) + ' is already a collaborator');
        return null;
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
    }
  }
}
