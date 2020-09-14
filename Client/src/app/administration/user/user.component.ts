import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
declare var $:any;

import { employees } from "./employees";
import { Router } from '@angular/router';
import {User} from "../../common/models/user.model";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  users: User[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private userService: UserService) { 
    
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: false
    };
    this.userService.getUsers()
    .pipe(first())
    .subscribe(
        data => {
          this.users = data;

          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        },
        error => {
          console.log(error);
        });
    //$("#dataTable").DataTable({
    //     ordering:  false,
    //     dom: "Bfrtip",
    //     buttons: [{
    //         extend: "copy",
    //         className: "btn-sm"
    //     }, {
    //         extend: "csv",
    //         className: "btn-sm"
    //     }, {
    //         extend: "excel",
    //         className: "btn-sm"
    //     }, {
    //         extend: "pdf",
    //         className: "btn-sm"
    //     }, {
    //         extend: "print",
    //         className: "btn-sm"
    //     }],
    //     responsive: !0
    //     });
  }

  

  ngAfterViewInit(): void {
    //https://l-lin.github.io/angular-datatables/#/extensions/responsive

    
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

        // rerender datatable
        this.rerender();
        
    },
    error => {
        //this.alertService.error(error);
        console.log(error.status, error);
    });

    
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
