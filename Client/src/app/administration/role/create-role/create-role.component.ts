import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Role } from '../role.model';
import { RoleService } from '../role.service';
import { first } from 'rxjs/internal/operators/first';
import { AlertConfig, SweetAlertService } from 'src/app/common/services/sweet-alert.service';
import { AlertPositionBottomEnd, AlertPositionTopEnd, IconError, IconSuccess } from 'src/app/common/models/constantVariables';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private RoleService: RoleService,
    private sweetAlert: SweetAlertService
  ) { }

  roleForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  backendModelStateErrors: Array<any> = [];

  // convenience getter for easy access to form fields
  get f() { return this.roleForm.controls; }
  
  ngOnInit() {
    this.roleForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.roleForm.invalid) {
        return;
    }

    var formData = this.roleForm.value;

    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    var role = new Role();
    role.Name = formData.Name;
  
    this.loading = true;
    this.RoleService.createRole(role)
    .pipe(first())
    .subscribe(
      data => {
        this.sweetAlert.alert({
          position: AlertPositionTopEnd,
          icon: IconSuccess,
          title: "New Role created successfully"
        });
        this.router.navigate(['/admin/roles']);
    },
    error => {
        this.sweetAlert.alert({
          position: AlertPositionTopEnd,
          icon: IconError,
          title: error.error.ModelState[""]
        });

        this.loading = false;
        this.backendModelStateErrors = error.error.ModelState[""];

        console.log(error.status, error.error.ModelState[""]);
    });
    
  }

  navigateToRolesPage(){
    this.router.navigate(['/admin/roles']);
  }

}
