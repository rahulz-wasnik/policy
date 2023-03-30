import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyComponent } from './create-policy.component';
import { CreatePolicyResolver } from './create-policy.resolver';
import { FormValidationComponent } from '../../shared/components/form-validation/form-validation.component';


@NgModule({
  declarations: [
    CreatePolicyComponent
  ],
  imports: [
    CommonModule,
    CreatePolicyRoutingModule,
    ReactiveFormsModule,
    FormValidationComponent
  ],
  providers: [
    CreatePolicyResolver
  ]
})
export class CreatePolicyModule { }
