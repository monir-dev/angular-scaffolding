import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: User = new User();

  constructor(private route: ActivatedRoute,private router: Router) { }

  userForm: FormGroup;

  ngOnInit() {
    this.userForm = new FormGroup({
      UserName: new FormControl(this.user.UserName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      EmailAddress: new FormControl(''),
      Name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      Password: new FormControl(''),
      ConfirmPassword: new FormControl(''),
      PhoneNumber: new FormControl('')
    });
  }

  onSubmit(){
    var formData = this.userForm.value;

    console.log(formData);
    
  }

  navigateToUsersPage(){
    this.router.navigate(['/admin/users']);
  }

}
