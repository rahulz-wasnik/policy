import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPolicyRoutingModule } from './add-policy-routing.module';
import { AddPolicyComponent } from './add-policy.component';


@NgModule({
  declarations: [
    AddPolicyComponent
  ],
  imports: [
    CommonModule,
    AddPolicyRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddPolicyModule { }
