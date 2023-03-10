import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent {
constructor( public router: Router,) { }
 
  newPage()
  {
    this.router.navigate(["/paper"]);
  }
}
