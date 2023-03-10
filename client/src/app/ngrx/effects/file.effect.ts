import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
import * as FileActions from '../actions/file.action';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private fileService: FileService) {}

  getFiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFiles),
      switchMap(() => {
        return this.fileService.getFiles();
      }),
      map((files) => {
        return FileActions.getFilesSuccess({ files: <DocumentFile[]>files });
      }),
      catchError((error) => {
        return of(FileActions.getFilesFailure({ error: error }));
      })
    );
  });
}
