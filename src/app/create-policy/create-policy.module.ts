import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyComponent } from './create-policy.component';
import { CreatePolicyResolver } from './create-policy.resolver';


@NgModule({
  declarations: [
    CreatePolicyComponent
  ],
  imports: [
    CommonModule,
    CreatePolicyRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CreatePolicyResolver
  ]
})
export class CreatePolicyModule { }
