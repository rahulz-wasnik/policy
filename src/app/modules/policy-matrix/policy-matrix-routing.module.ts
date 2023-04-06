import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/shared/constants';
import { PolicyMatrixContainerComponent } from './policy-matrix-container.component';
import { PolicyMatrixResolver } from './policy-matrix.resolver';
import { ViewModifyPolicyMatrixContainerComponent } from './view-modify-policy-matrix/view-modify-policy-matrix-container.component';

const routes: Routes = [
  { path: routeConstants.CREATE, component: PolicyMatrixContainerComponent, resolve: { value: PolicyMatrixResolver } },
  { path: routeConstants.VIEW_MODIFY, component: ViewModifyPolicyMatrixContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyMatrixRoutingModule { }
