import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/shared/constants';
import { CreatePolicyMatrixContainerComponent } from './create-policy-matrix/create-policy-matrix-container.component';
import { ModifyPolicyMatrixContainerComponent } from './modify-policy-matrix/modify-policy-matrix-container.component';
import { PolicyMatrixResolver } from './policy-matrix.resolver';
import { ViewPolicyMatricesContainerComponent } from './view-policy-matrices/view-policy-matrices-container.component';

const routes: Routes = [
  { path: routeConstants.CREATE, component: CreatePolicyMatrixContainerComponent, resolve: { value: PolicyMatrixResolver } },
  { path: routeConstants.MODIFY, component: ModifyPolicyMatrixContainerComponent, resolve: { value: PolicyMatrixResolver } },
  { path: routeConstants.VIEW, component: ViewPolicyMatricesContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyMatrixRoutingModule { }
