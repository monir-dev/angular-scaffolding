import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// const routes: Routes = [
//   { path: 'admin', component: AdministrationComponent }
// ];

// export const routes: Routes = [
//   { path: '', redirectTo: 'admin', pathMatch: 'full' },
//   { path: 'admin', component: AdministrationComponent, outlet: "outlet1"
//     ,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: DashboardComponent }
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
