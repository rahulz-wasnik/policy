import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewModifyPolicyRoutingModule } from './view-modify-policy-routing.module';
import { ViewModifyPolicyComponent } from './view-modify-policy.component';
import { ViewModifyPolicyResolver } from './view-modify-policy.resolver';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { FormValidationComponent } from 'src/app/shared/components/form-validation/form-validation.component';
import { ViewModifyPolicyContainerComponent } from './view-modify-policy-container.component';


@NgModule({
  declarations: [
    ViewModifyPolicyContainerComponent,
    ViewModifyPolicyComponent
  ],
  imports: [
    CommonModule,
    ViewModifyPolicyRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MessageComponent,
    FormValidationComponent
  ],
  providers: [
    ViewModifyPolicyResolver
  ]
})
export class ViewModifyPolicyModule { }
