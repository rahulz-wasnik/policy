import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { 
    path: 'add-policy', 
    loadChildren: () => import('./add-policy/add-policy.module').then(m => m.AddPolicyModule) 
  }, 
  { 
    path: 'view-modify-policy',
    loadChildren: () => import('./view-modify-policy/view-modify-policy.module').then(m => m.ViewModifyPolicyModule) 
  },
  { 
    path: 'view-policy-history',
    loadChildren: () => import('./view-policy-history/view-policy-history.module').then(m => m.ViewPolicyHistoryModule)
  },
  { path: 'error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
