import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/common/models/user.model';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService) { }

  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  backendModelStateErrors: Array<any> = [];

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {    
    if (c.get('Password').value !== c.get('ConfirmPassword').value) {
        return {invalid: true};
    }
  }
  
  ngOnInit() {
    this.userForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      Password: new FormControl('',[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')
      ]),
      ConfirmPassword: new FormControl('',[
        Validators.required
      ]),
      PhoneNumber: new FormControl('', [
        Validators.maxLength(11)
      ])
    }, this.passwordConfirming);
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    var formData = this.userForm.value;

    // reset backendModelStateErrors
    this.backendModelStateErrors = [];

    // reset alerts on submit
    //this.alertService.clear();

    var user = new User();
    user.Email = formData.Email;
    user.Password = formData.Password;
    user.UserName = formData.Email;
  
    this.loading = true;
    this.userService.createUser(user)
    .pipe(first())
    .subscribe(
      data => {
        //console.log(data);
        
        //this.alertService.success('Registration successful', true);
        this.router.navigate(['/admin/users']);
    },
    error => {
        //this.alertService.error(error);
        this.loading = false;
        this.backendModelStateErrors = error.error.ModelState[""];

        console.log(error.status, error.error.ModelState[""]);
    });
    
  }

  navigateToUsersPage(){
    this.router.navigate(['/admin/users']);
  }

}
