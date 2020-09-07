import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];    
      console.log(`${id}`);
    });
  }

  navigateToUsersPage(){
    this.router.navigate(['/admin/users']);
  }

}
