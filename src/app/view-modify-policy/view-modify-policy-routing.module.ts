import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModifyPolicyComponent } from './view-modify-policy.component';

const routes: Routes = [{ path: '', component: ViewModifyPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModifyPolicyRoutingModule { }
