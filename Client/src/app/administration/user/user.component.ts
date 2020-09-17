import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
declare var $:any;

import { Router } from '@angular/router';
import {User} from "../../common/models/user.model";
import { Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/common/services/sweet-alert.service';
import { IconError } from 'src/app/common/models/constantVariables';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private userService: UserService, private sweetAlert: SweetAlertService) { 
    
  }

  ngOnInit() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
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

          if(!error.ok) {
            this.sweetAlert.toastAlert({
              icon: IconError,
              title: "Can't connect to server."
            });
          }

        });
  }

  

  ngAfterViewInit(): void {
    //https://l-lin.github.io/angular-datatables/#/extensions/responsive

    
  }

  loadCreateUserPage() {
    this.router.navigate(['/admin/users/create']);
  }


  onDeleteUser(id) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(id).pipe(first())
          .subscribe(
            data => {
              // remove that user for user list
              this.users = this.users.filter((user: User) => user.Id != id);

              // Show Delete confirmation message
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'User has been deleted successfully.',
                'success'
              );

              // rerender datatable
              this.rerender();
              
          },
          error => {
              //this.alertService.error(error);
              swalWithBootstrapButtons.fire(
                'Failed',
                'Getting error while try to delete the user!',
                'error'
              );

              console.log(error.status, error);
          });
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'this user is safe :)',
          'error'
        );
      }
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
