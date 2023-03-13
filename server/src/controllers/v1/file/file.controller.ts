import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { FileService } from 'src/services/file/file.service';
import { File } from 'src/schemas/file.schema';

@Controller('v1/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  async createFile(@Body() file: File) {
    let f = await this.fileService.getFileById(file.fileId);
    if (f) {
      return this.fileService.updateFile(file.fileId, file);
    }
    return this.fileService.createFile(file);
  }

  @Put('/update/:id')
  async updateFile(@Param(`id`) id: string, @Body() file: File) {
    let updatedFile = await this.fileService.updateFile(id, file);
    return updatedFile;
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
}
