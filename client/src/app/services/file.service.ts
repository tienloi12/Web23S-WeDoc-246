import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentFile } from '../models/file.model';
import { CreateFileState, GetFileDetailState } from '../ngrx/states/file.state';
import * as FileActions from '../ngrx/actions/file.action';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  content!: string;
  title!: string | null;
  authorId!: UserModel;
  collaborators!: UserModel[];
  createAt!: string;

  userMain!: UserModel;
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ file: CreateFileState; getFile: GetFileDetailState }>
  ) {}

  createFile(file: DocumentFile) {
    return this.httpClient.post<DocumentFile>(
      environment.hostingURL + '/v1/file/create',
      file
    );
  }

  updateFile(fileId: string, file: DocumentFile) {
    return this.httpClient.put(
      environment.hostingURL + `/v1/file/update/${fileId}`,
      file
    );
  }

  deleteFile(fileId: string) {
    console.log(fileId);
    return this.httpClient.delete(
      environment.hostingURL + `/v1/file/delete/${fileId}`
    );
  }

  getFileDetail(fileId: string) {
    return this.httpClient.get(
      environment.hostingURL + `/v1/file/info/${fileId}`
    );
  }

  getFiles() {
    return this.httpClient.get(environment.hostingURL + '/v1/file/all');
  }

  getFilesByAuthorId(authorId: string) {
    return this.httpClient.get(
      environment.hostingURL + `/v1/file/author/${authorId}`
    );
  }

  getFilesByCollaboratorId(collaboratorId: string) {
    return this.httpClient.get(
      environment.hostingURL + `/v1/file/file-colab/${collaboratorId}`
    );
  }

  inviteCollaborator(file: DocumentFile, email: string | null) {
    return this.httpClient.put(
      environment.hostingURL + `/v1/file/invite/${email}`,
      file
    );
  }

  save(user: UserModel) {
    this.content = document.querySelector(
      '.ProseMirror.NgxEditor__Content'
    )!.innerHTML;
    let input = document.querySelector('#title') as HTMLInputElement;
    if (input.value === 'Untitled') {
      this.title = 'Untitled';
    } else {
      this.title = input.value;
    }
    let file!: DocumentFile;
    file = {
      fileId: Date.now().toString(),
      authorId: user,
      title: this.title,
      content: this.content,
      collaborators: [],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    this.store.dispatch(
      FileActions.createFile({
        file: file,
      })
    );
  }

  update(user: UserModel) {
    let url = window.location.href;
    let string = url.split('/');
    let fileId = string[string.length - 1];
    this.content = document.querySelector(
      '.ProseMirror.NgxEditor__Content'
    )!.innerHTML;
    let input = document.querySelector('#title') as HTMLInputElement;
    if (input.value === 'Untitled') {
      this.title = 'Untitled';
    } else {
      this.title = input.value;
    }
    let file!: DocumentFile;
    file = {
      fileId: fileId,
      authorId: this.authorId,
      title: this.title,
      content: this.content,
      collaborators: this.collaborators,
      createdAt: this.createAt,
      updatedAt: new Date().toString(),
    };
    this.store.dispatch(
      FileActions.updateFile({
        fileId: fileId,
        file: file,
      })
    );
  }
}
