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
    path: routeConstants.POLICY_MATRIX,
    loadChildren: () => import('./modules/policy-matrix/policy-matrix.module').then(m => m.PolicyMatrixModule)
  },
  {
    path: 'error',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
