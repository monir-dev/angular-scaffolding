import { Component, OnInit, NgModule } from '@angular/core';
declare var $:any;

import { employees } from "./employees";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public users: Array<any> = employees;

  constructor() { }

  ngOnInit() {

    // $(document).ready(function(){
      
    // });    
    $('#datatable').dataTable();
  }


  ngOnDestroy(): void {
    $("#datatable").destroy();
  }
}
