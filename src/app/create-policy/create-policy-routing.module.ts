import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePolicyComponent } from './create-policy.component';
import { CreatePolicyResolver } from './create-policy.resolver';

const routes: Routes = [{ path: '', component: CreatePolicyComponent, resolve: { phases: CreatePolicyResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePolicyRoutingModule { }
