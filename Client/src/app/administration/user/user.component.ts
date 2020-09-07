import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../common/service/user.service';

declare var $:any;

import { employees } from "./employees";
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public users: Array<any> = [];
  public table: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUser();
  }

  ngAfterViewInit(): void {
    this.table = $("#dataTable").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            className: "btn-sm"
        }, {
            extend: "csv",
            className: "btn-sm"
        }, {
            extend: "excel",
            className: "btn-sm"
        }, {
            extend: "pdf",
            className: "btn-sm"
        }, {
            extend: "print",
            className: "btn-sm"
        }],
        responsive: !0
    });
  }

  loadCreateUserPage() {
    this.router.navigate(['/admin/users/create']);
  }

}
