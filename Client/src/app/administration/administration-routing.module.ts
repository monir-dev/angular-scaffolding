import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationComponent } from './administration.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AuthGuard } from '../common/helpers/auth.guard';


const routes: Routes = [
  { path: '', component: AdministrationComponent
    ,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

      { path: 'admin/users/create', component: CreateUserComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'admin/users/:id/edit', component: EditUserComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'admin/users', component: UserComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
