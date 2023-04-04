import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModifyPolicyContainerComponent } from './view-modify-policy-container.component';
import { ViewModifyPolicyResolver } from './view-modify-policy.resolver';

const routes: Routes = [{ path: '', component: ViewModifyPolicyContainerComponent, resolve: { value: ViewModifyPolicyResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModifyPolicyRoutingModule { }
