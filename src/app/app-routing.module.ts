import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { routeConstants } from './shared/constants';

const routes: Routes = [
  { 
    path: routeConstants.CREATEPOLICY,
    loadChildren: () => import('./modules/create-policy/create-policy.module').then(m => m.CreatePolicyModule) 
  },
  { 
    path: routeConstants.VIEWMODIFYPOLICY,
    loadChildren: () => import('./modules/view-modify-policy/view-modify-policy.module').then(m => m.ViewModifyPolicyModule) 
  },
  { 
    path: routeConstants.VIEWPOLICYHISTORY,
    loadChildren: () => import('./modules/view-policy-history/view-policy-history.module').then(m => m.ViewPolicyHistoryModule)
  },
  { path: 'error', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
