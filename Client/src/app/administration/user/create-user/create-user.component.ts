import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
  }

  navigateToUsersPage(){
    this.router.navigate(['/admin/users']);
  }

}
