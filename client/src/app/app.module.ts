import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './ngrx/reducers/auth.reducer';
import { AuthEffects } from './ngrx/effects/auth.effect';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './ngrx/reducers/user.reducer';
import { UserEffects } from './ngrx/effects/user.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ColabDialogComponent } from './components/colab-dialog/colab-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  createFileReducer,
  deleteFileReducer,
  fileReducers,
  // fileReducers,
  getFileReducer,
  getFilesReducer,
} from './ngrx/reducers/file.reducer';
import { FileEffects } from './ngrx/effects/file.effect';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { InviteDialogComponent } from './components/invite-dialog/invite-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ColabDialogComponent,
    DeleteDialogComponent,
    InviteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot(
      {
        auth: authReducer,
        user: userReducer,
        createfile: createFileReducer,
        getFiles: getFilesReducer,
        getFile: getFileReducer,
        file: fileReducers,
        deleteFile: deleteFileReducer,
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects, UserEffects, FileEffects]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
