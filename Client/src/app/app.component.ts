import { Component } from '@angular/core';
// import * as $ from 'jquery'; // I faced issue in using jquery's popover
declare var $: any; // declaring jquery in this way solved the problem

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client';
}
