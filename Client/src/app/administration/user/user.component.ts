import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
declare var $:any;

import { employees } from "./employees";
import { Router } from '@angular/router';
import {User} from "../../common/models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public users: Array<User> = [];
  public table: any;

  constructor(private router: Router, private userService: UserService) { 
    this.userService.getUsers()
    .pipe(first())
    .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.table = $("#dataTable").DataTable({
        ordering:  false,
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

  

  ngAfterViewInit(): void {

    var searchField = document.getElementById("dataTable_filter").children[0].children[0];
    searchField.addEventListener('keypress', logKey);

    function logKey(e) {
      console.log(e);      
    }
    

    //https://l-lin.github.io/angular-datatables/#/extensions/responsive
    
    $('#dataTable_filter input').on('keypress', function(e) {
        e.preventDefault();
        var value = "";
        if(e.key != "Enter"){
          value = e.target.value + e.key;
          e.target.value = value; 
        }
        
        //filterUsers(value);
        
    });

  }

  filterUsers(value) {
    console.log(this.users);
    // this.users = this.users.filter((user: User) => user.Email.includes(value) || user.PhoneNumber.includes(value));
  }


  loadCreateUserPage() {
    this.router.navigate(['/admin/users/create']);
  }


  onDeleteUser(id) {
    this.userService.deleteUser(id).pipe(first())
    .subscribe(
      data => {
        // remove that user for user list
        this.users = this.users.filter((user: User) => user.Id != id);
    },
    error => {
        //this.alertService.error(error);
        console.log(error.status, error);
    });

    
  }

}
