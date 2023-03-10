import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpCLient: HttpClient) {}

  getFiles() {
    return this.httpCLient.get('http://localhost:3000/v1/file/all');
  }
}
