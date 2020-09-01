import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
  }

  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
