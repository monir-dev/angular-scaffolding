import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../role.model';
import { first } from 'rxjs/internal/operators/first';
import { AlertPositionTopEnd, IconError, IconSuccess } from 'src/app/common/models/constantVariables';
import { SweetAlertService } from 'src/app/common/services/sweet-alert.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private roleService: RoleService, private sweetAlert: SweetAlertService) { }

  roleForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  roleId: string;
  role: Role;


  backendModelStateErrors: Array<any> = [];

  // convenience getter for easy access to form fields
  get f() { return this.roleForm.controls; }

  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.roleId = params['id'];
    });

    if(this.roleId) {
      this.roleService.getRoleById(this.roleId)
        .pipe(first())
        .subscribe(data => {
          this.role = data;

          // Form Set default Values
          this.loadDefaultFormValues();
        },
        error => {
            console.log(error);
        });
    }

    this.roleForm = new FormGroup({
      Id: new FormControl('', [
        Validators.required
      ]),
      Name: new FormControl('', [
        Validators.required
      ])
    });


    
  }

  loadDefaultFormValues() {
    this.f.Id.setValue(this.role.Id);
    this.f.Name.setValue(this.role.Name);
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.roleForm.invalid) {
        return;
    }

    var formData = this.roleForm.value;


    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    // // reset alerts on submit
    // //this.alertService.clear();


    this.role.Name = formData.Name;
  
    this.loading = true;
    this.roleService.editRole(this.role)
    .pipe(first())
    .subscribe(
      data => {
        this.sweetAlert.alert({
          position: AlertPositionTopEnd,
          icon: IconSuccess,
          title: "Role informations update successfully"
        });
        
        this.router.navigate(['/admin/roles']);
    },
    error => {
        this.sweetAlert.alert({
          position: AlertPositionTopEnd,
          icon: IconError,
          title: error.error.Message
        });

        this.loading = false;
        this.backendModelStateErrors.push(error.error.Message);

        console.log(error.status, error.error);
    });
    
  }
  
  navigateToRolesPage(){
    this.router.navigate(['/admin/roles']);
  }

}
