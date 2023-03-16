import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GetFilesState } from 'src/app/ngrx/states/file.state';
import { DocumentFile } from 'src/app/models/file.model';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { UserState } from 'src/app/ngrx/states/user.state';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit, OnDestroy {
  userSubscribtion!: Subscription;
  user$ = this.store.select('user', 'user');
  files$ = this.store.select('getFiles', 'sharedFiles');
  constructor(
    private router: Router,
    private store: Store<{ getFiles: GetFilesState; user: UserState }>
  ) {}

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('getFiles', 'sharedFiles');
    this.userSubscribtion = this.user$.subscribe((user) => {
      console.log(user);
      if (user._id) {
        this.store.dispatch(
          FileActions.getFilesByCollaboratorId({ collaboratorId: user._id })
        );
      }
    });

    this.files$.subscribe((files) => {
      console.log(files);
    });
  }

  openFile($event: any) {
    this.router.navigate(['/paper/' + $event]);
  }
}
