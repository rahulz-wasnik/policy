import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/shared/constants';
import { CreatePolicyContainerComponent } from './create-policy/create-policy-container.component';
import { ViewPolicyContainerComponent } from './view-policy/view-policy-container.component';

const routes: Routes = [
    { path: routeConstants.CREATE, component: CreatePolicyContainerComponent },
    { path: routeConstants.VIEW, component: ViewPolicyContainerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PolicyRoutingModule {}
