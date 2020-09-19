import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DataTablesModule } from 'angular-datatables';

import { AdministrationComponent } from './administration.component';

import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';

import { RegistrationComponent } from './registration/registration.component';

import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

import { RoleComponent } from './role/role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';


import { AdministrationRoutingModule } from './administration-routing.module';

import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { AuthService } from './auth.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    DataTablesModule
  ],
  declarations: [
    AdministrationComponent,
    TopbarComponent,
    LeftSideMenuComponent,
    RightSideBarComponent,
    FooterComponent,
    BreadcrumbComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    RoleComponent,
    CreateRoleComponent,
    EditRoleComponent
  ],
  providers: [
    UserService,
    AuthService,
    RoleService
  ]
})
export class AdministrationModule { }
