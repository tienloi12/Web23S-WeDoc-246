import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { FileService } from 'src/services/file/file.service';
import { File } from 'src/schemas/file.schema';

@Controller('v1/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  async createFile(@Body() file: File) {
    return this.fileService.createFile(file);
  }

  @Get(':id')
  async getFileById(@Param(`id`) id: string) {
    let file = await this.fileService.getFileById(id);
    return file;
  }
}
