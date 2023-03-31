import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModifyPolicyComponent } from './view-modify-policy.component';
import { ViewModifyPolicyResolver } from './view-modify-policy.resolver';

const routes: Routes = [{ path: '', component: ViewModifyPolicyComponent, resolve: { value: ViewModifyPolicyResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModifyPolicyRoutingModule { }
