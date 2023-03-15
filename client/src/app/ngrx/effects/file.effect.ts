import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileService } from 'src/app/services/file.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
import * as FileActions from '../actions/file.action';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private fileService: FileService) {}

  createFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.createFile),
      switchMap((action) => {
        return this.fileService.createFile(action.file);
      }),
      map((file) => {
        return FileActions.createFileSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) => of(FileActions.createFileFailure({ error })))
    );
  });

  getFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFileDetail),
      switchMap((action) => {
        return this.fileService.getFileDetail(action.fileId);
      }),
      map((file) => {
        return FileActions.getFileDetailSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) =>
        of(FileActions.getFileDetailFailure({ error: error }))
      )
    );
  });

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

  getFilesByAuthorId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFilesByAuthorId),
      switchMap((action) => {
        return this.fileService.getFilesByAuthorId(action.authorId);
      }),
      map((files) => {
        console.log(files);

        return FileActions.getFilesByAuthorIdSuccess({
          files: <DocumentFile[]>files,
        });
      }),
      catchError((error) => {
        return of(FileActions.getFilesByAuthorIdFailure({ error: error }));
      })
    );
  });

  updateFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.updateFile),
      switchMap((action) => {
        return this.fileService.updateFile(action.fileId, action.file);
      }),
      map((file) => {
        return FileActions.updateFileSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) => {
        return of(FileActions.updateFileFailure({ error: error }));
      })
    );
  });

  deleteFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.deteleFile),
      switchMap((action) => {
        return this.fileService.deleteFile(action.fileId);
      }),
      map((msg) => {
        return FileActions.deteleFileSuccess({ msg: <string>msg });
      }),
      catchError((error) => {
        return of(FileActions.deteleFileFailure({ error: error }));
      })
    );
  });

  inviteCollaborator$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.inviteCollaborator),
      switchMap((action) =>
        this.fileService.inviteCollaborator(action.file, action.email)
      ),
      map((file: any) => {
        console.log(file);
        if (file === null || file === undefined || file === '') {
          return FileActions.inviteCollaboratorFailure({
            error: 'User not found',
          });
        } else if (file.error === 'User is already a collaborator') {
          return FileActions.inviteCollaboratorFailure({
            error: 'User is already a collaborator',
          });
        } else {
          return FileActions.inviteCollaboratorSuccess();
        }
      }),
      catchError((error: string) => {
        return of(
          FileActions.inviteCollaboratorFailure({ error: 'User not found' })
        );
      })
    );
  });
}
