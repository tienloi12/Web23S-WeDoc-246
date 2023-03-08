import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeShareComponent } from './components/home-share/home-share.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'share', component: HomeShareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
