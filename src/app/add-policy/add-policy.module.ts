import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {provideHttpClient } from '@angular/common/http';

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
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AddPolicyModule { }
