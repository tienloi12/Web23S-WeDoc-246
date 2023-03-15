import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { FileService } from 'src/services/file/file.service';
import { File, FileDocument } from 'src/schemas/file.schema';

@Controller('v1/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  async createFile(@Body() file: File) {
    return this.fileService.createFile(file);
  }

  @Put('/update/:id')
  async updateFile(@Param(`id`) fileId: string, @Body() file: File) {
    return this.fileService.updateFile(fileId, file);
  }

  @Get('info/:id')
  async getFileById(@Param(`id`) id: string) {
    let file = await this.fileService.getFileById(id);
    return file;
  }

  @Get('all')
  async getFiles() {
    let files = await this.fileService.getFiles();
    return files;
  }

  @Get('author/:id')
  async getFilesByAuthorId(@Param(`id`) id: string) {
    let files = await this.fileService.getFilesByAuthorId(id);
    return files;
  }

  @Put('invite/:id')
  async inviteCollaborator(
    @Body() file: FileDocument,
    @Param(`id`) uid: string,
  ) {
    let data = await this.fileService.inviteCollaborator(file, uid);
    return data;
  }
}
