import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/schemas/file.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class FileService {
  constructor(
    private userService: UserService,
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // CREATE FILE
  async createFile(file: File): Promise<File | any> {
    try {
      let data = await this.fileModel.create(file);
      return data;
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
      return 'successfully deleted';
    } catch (error) {
      ('unsuccessfully deleted');
    }
  }

  // GET FILES BY COLLABORATOR ID
  async getFilesByCollaboratorId(
    collaboratorId: string,
  ): Promise<File[] | null> {
    try {
      let data = await this.fileModel
        .find({ collaborators: { $eq: Object(collaboratorId) } })
        .populate('collaborators', 'photoURL', this.userModel)
        .populate('authorId', 'photoURL', this.userModel)
        .exec();
      return data;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
    }
  }

  // INVITE collaborator
  async inviteCollaborator(file: FileDocument, email: string) {
    try {
      let user = await this.userService.getUserByEmail(email);
      if (user == null) {
        return null;
      }
      console.log(user.email + ' is a valid user');
      // check if user is already a collaborator
      let isCollab = file.collaborators.find(
        (collab) => collab == Object(user._id),
      );
      if (!isCollab) {
        let newFile: File = {
          fileId: file.fileId,
          authorId: file.authorId,
          title: file.title,
          content: file.content,
          collaborators: [...file.collaborators, Object(user._id)],
        };
        return await this.fileModel
          .findOneAndUpdate({ _id: file._id }, newFile, { new: true })
          .exec();
      } else {
        console.log(email + ' is already a collaborator');
        return { error: 'User is already a collaborator' };
      }
    } catch (error) {
      // return new HttpException(error.message, HttpStatus.BAD_REQUEST) as any;
      return null;
    }
  }
}
