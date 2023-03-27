import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPolicyRoutingModule } from './add-policy-routing.module';
import { AddPolicyComponent } from './add-policy.component';


@NgModule({
  declarations: [
    AddPolicyComponent
  ],
  imports: [
    CommonModule,
    AddPolicyRoutingModule
  ]
})
export class AddPolicyModule { }
