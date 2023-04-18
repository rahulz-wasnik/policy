import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/shared/constants';
import { CreateRiskProfileContainerComponent } from './create-risk-profile/create-risk-profile-container.component';

const routes: Routes = [
  { path: routeConstants.CREATE, component: CreateRiskProfileContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskProfileRoutingModule { }
