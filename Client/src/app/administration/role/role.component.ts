import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './role.service';
import { first } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
declare var $:any;

import { Router } from '@angular/router';
import {Role} from "./role.model";
import { Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/common/services/sweet-alert.service';
import { IconError } from 'src/app/common/models/constantVariables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  roles: Role[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private roleService: RoleService, private sweetAlert: SweetAlertService) { 
    
  }

  ngOnInit() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: false,
      processing: false
    };
    this.roleService.getRoles()
    .pipe(first())
    .subscribe(
        data => {
          this.roles = data;

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

  loadCreateRolePage() {
    this.router.navigate(['/admin/roles/create']);
  }


  onDeleteRole(id) {

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

        this.roleService.deleteRole(id).pipe(first())
          .subscribe(
            data => {
              // remove that user for user list
              this.roles = this.roles.filter((role: Role) => role.Id != id);

              // Show Delete confirmation message
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Role has been deleted successfully.',
                'success'
              );

              // rerender datatable
              this.rerender();
              
          },
          error => {
              //this.alertService.error(error);
              swalWithBootstrapButtons.fire(
                'Failed',
                'Getting error while try to delete the role!',
                'error'
              );

              console.log(error.status, error);
          });
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'this role is safe :)',
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
