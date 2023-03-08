import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { SharedComponent } from './components/shared/shared.component';
import { HomeComponent } from './home.component';
import { SavedComponent } from './components/saved/saved.component';
const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [
    { path: 'main', component: HomeMainComponent },
    { path: 'shared', component: SharedComponent },
    { path: 'saved', component: SavedComponent },   ]
},];

// { path: 'share', component: HomeShareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
