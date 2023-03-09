import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileService } from 'src/app/services/file.service';
import * as FileActions from '../actions/file.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { FileModel } from 'src/app/models/file.model';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private fileService: FileService) {}

  createFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.createFile),
      switchMap((action: any) => {
        return this.fileService.createFile(action.file);
      }),
      map((file) => {
        return FileActions.createFileSuccess({ file: <FileModel>file });
      }),
      catchError((error) => of(FileActions.createFileFailure({ error })))
    );
  });

  getFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFile),
      switchMap((action: any) => {
        return this.fileService.getFile(action.fileId);
      }),
      map((file) => {
        return FileActions.getFileSuccess({ file: <FileModel>file });
      }),
      catchError((error) => of(FileActions.getFileFailure({ error })))
    );
  });
}
