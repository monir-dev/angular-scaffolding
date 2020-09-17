import { Component, OnInit } from '@angular/core';

import { SweetAlertService } from "../common/services/sweet-alert.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})



export class AdministrationComponent implements OnInit {

  constructor(private sweetAlert: SweetAlertService) { }

  ngOnInit() {
    // this.sweetAlert.sweet();
    //this.sweetAlert.toastAlert();
  }

}