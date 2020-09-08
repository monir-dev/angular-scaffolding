import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { AdministrationRoutingModule } from './administration-routing.module';
import { UserService } from '../common/service/user.service';
import { AuthService } from './services/auth.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
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
    EditUserComponent
  ],
  providers: [
    UserService,
    AuthService
  ]
})
export class AdministrationModule { }
