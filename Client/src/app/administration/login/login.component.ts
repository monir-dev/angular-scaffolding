import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';  
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/common/services/sweet-alert.service';
import { IconSuccess } from 'src/app/common/models/constantVariables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private sweetAlert: SweetAlertService) {  }

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  backendModelStateErrors: Array<any> = [];

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.sweetAlert.toastAlert({
                  icon: IconSuccess,
                  title: "Sign in successfully"
                });
                this.router.navigate([this.returnUrl]);
            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
                this.backendModelStateErrors.push(error.error.error_description);  
                this.f.password.setValue("");          
            });
  }


  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
