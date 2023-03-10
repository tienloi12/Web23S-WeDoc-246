import { Controller, Get } from '@nestjs/common';
import { FileService } from 'src/services/file/file.service';

@Controller('v1/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('all')
  async getFiles() {
    let files = await this.fileService.getFiles();
    return files;
  }
}
