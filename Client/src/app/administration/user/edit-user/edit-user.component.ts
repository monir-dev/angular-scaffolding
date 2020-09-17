import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/common/models/user.model';
import { first } from 'rxjs/internal/operators/first';
import { AlertPositionTopEnd, IconError, IconSuccess } from 'src/app/common/models/constantVariables';
import { SweetAlertService } from 'src/app/common/services/sweet-alert.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService, private sweetAlert: SweetAlertService) { }

  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  userId: string;
  user: User;


  backendModelStateErrors: Array<any> = [];

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {    
    if (c.get('Password').value !== c.get('ConfirmPassword').value) {
        return {invalid: true};
    }
  }
  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    if(this.userId) {
      this.userService.getUserById(this.userId)
        .pipe(first())
        .subscribe(data => {
          this.user = data;

          // Form Set default Values
          this.loadDefaultFormValues();
        },
        error => {
            console.log(error);
        });
    }

    this.userForm = new FormGroup({
      Id: new FormControl('', [
        Validators.required
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      Password: new FormControl('',[
        // Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')
      ]),
      ConfirmPassword: new FormControl('',[
        // Validators.required
      ]),
      PhoneNumber: new FormControl('', [
        Validators.maxLength(11)
      ])
    }, this.passwordConfirming);


    
  }

  loadDefaultFormValues() {
    this.f.Id.setValue(this.user.Id);
    this.f.Email.setValue(this.user.Email);
    this.f.Password.setValue('');
    this.f.ConfirmPassword.setValue('');
    this.f.PhoneNumber.setValue(this.user.PhoneNumber);
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    var formData = this.userForm.value;


    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    // // reset alerts on submit
    // //this.alertService.clear();


    this.user.Email = formData.Email;
    this.user.Password = formData.Password;
    this.user.PhoneNumber = formData.PhoneNumber;
  
    this.loading = true;
    this.userService.editUser(this.user)
    .pipe(first())
    .subscribe(
      data => {
        this.sweetAlert.alert({
          position: AlertPositionTopEnd,
          icon: IconSuccess,
          title: "User informations update successfully"
        });
        
        this.router.navigate(['/admin/users']);
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
  
  navigateToUsersPage(){
    this.router.navigate(['/admin/users']);
  }

}
