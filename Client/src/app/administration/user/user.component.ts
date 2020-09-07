import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $:any;

import { employees } from "./employees";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public users: Array<any> = employees;

  constructor(private router: Router) { }

  ngOnInit() {
    // $(document).ready(function(){
    //      $('#dataTable').dataTable();
    // });    
  }
  ngAfterViewInit(): void {
    $('#dataTable').dataTable();
  }

  loadCreateUserPage() {
    this.router.navigate(['/admin/users/create']);
  }

  ngOnDestroy(): void {
    // $("#datatable").destroy();
  }
}
