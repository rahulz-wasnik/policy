import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyResolver } from './policy.resolver';
import { AddPolicyComponent } from './add-policy.component';

const routes: Routes = [
  { 
    path: '',
    component: AddPolicyComponent,
    resolve: { data: PolicyResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPolicyRoutingModule { }
