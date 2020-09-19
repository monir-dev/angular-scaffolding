import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


import { RegistrationModel } from './registration.model';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  backendModelStateErrors: [] = [];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {    
    if (c.get('password').value !== c.get('confrim_password').value) {
        return {invalid: true};
    }
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')
      ]),
      confrim_password: new FormControl('', [
        Validators.required
      ])
    }, this.passwordConfirming);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit(){
    //https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial
    var formData = this.registrationForm.value;

    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    var registrationModel = new RegistrationModel();
    registrationModel.Email = formData.email;
    registrationModel.Password = formData.password,
    registrationModel.ConfirmPassword = formData.confrim_password;

    this.loading = true;
    this.authService.register(registrationModel)
    .pipe(first())
    .subscribe(
      data => {
        //this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
    },
    error => {
        //this.alertService.error(error);
        this.loading = false;
        this.backendModelStateErrors = error.error.ModelState[""];

        console.log(error.status, error.error.ModelState[""]);
    });

  }

  navigateToLoginPage(){
    this.router.navigate(['/login']);
  }
}
