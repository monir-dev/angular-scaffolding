import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationComponent } from './administration.component';



const routes: Routes = [
  { path: '', component: AdministrationComponent
    ,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: 'admin/dashboard', component: DashboardComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
