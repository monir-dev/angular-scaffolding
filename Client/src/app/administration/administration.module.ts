import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationComponent } from './administration.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdministrationRoutingModule } from './administration-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ],
  declarations: [
    AdministrationComponent,
    TopbarComponent,
    LeftSideMenuComponent,
    RightSideBarComponent,
    FooterComponent,
    BreadcrumbComponent,
    DashboardComponent
  ]
})
export class AdministrationModule { }
