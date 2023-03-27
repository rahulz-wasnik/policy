import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewModifyPolicyRoutingModule } from './view-modify-policy-routing.module';
import { ViewModifyPolicyComponent } from './view-modify-policy.component';


@NgModule({
  declarations: [
    ViewModifyPolicyComponent
  ],
  imports: [
    CommonModule,
    ViewModifyPolicyRoutingModule
  ]
})
export class ViewModifyPolicyModule { }
