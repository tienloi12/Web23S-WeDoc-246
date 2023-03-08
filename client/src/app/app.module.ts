import { NgModule } from '@angular/core';
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
import {
  createUserReducer,
  getUserReducer,
} from './ngrx/reducers/createuser.reducer';
import { CreateUserEffects } from './ngrx/effects/createuser.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ColabDialogComponent } from './components/colab-dialog/colab-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, ColabDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot(
      {
        auth: authReducer,
        createUser: createUserReducer,
        getUser: getUserReducer,
      },

      {}
    ),
    EffectsModule.forRoot([AuthEffects, CreateUserEffects]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
