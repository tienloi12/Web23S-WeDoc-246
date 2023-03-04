import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  bold() {
    document.execCommand('bold', false, '');
  }

  underline() {
    document.execCommand('underline', false, '');
  }

  italic() {
    document.execCommand('italic', false, '');
  }

  colorText($event: any) {
    console.log($event);
    document.execCommand('foreColor', false, `${$event.target.value}`);
  }
}
