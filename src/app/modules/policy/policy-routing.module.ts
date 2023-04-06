import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from 'src/app/shared/constants';
import { CreatePolicyContainerComponent } from './create-policy-container.component';
import { CreatePolicyResolver } from './create-policy.resolver';

const routes: Routes = [
    { path: routeConstants.CREATE, component: CreatePolicyContainerComponent, resolve: { phases: CreatePolicyResolver } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PolicyRoutingModule {}
