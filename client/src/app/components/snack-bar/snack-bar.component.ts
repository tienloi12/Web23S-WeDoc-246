import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateFileState } from 'src/app/ngrx/states/file.state';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent{
  file$ !: Observable<CreateFileState>;
  file !:string;
  constructor(private store: Store<{ file: CreateFileState }>) {
    this.file$ = this.store.select('file');
  }
}
