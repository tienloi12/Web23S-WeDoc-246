import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { SharedComponent } from './components/shared/shared.component';
import { SavedComponent } from './components/saved/saved.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeMainComponent,
    SharedComponent,
    SavedComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
