import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PolicyMatrixRoutingModule } from './policy-matrix-routing.module';
import { PolicyMatrixComponent } from './policy-matrix.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { FormValidationComponent } from '../../shared/components/form-validation/form-validation.component';
import { PolicyMatrixResolver } from './policy-matrix.resolver';
import { SvgCancelComponent } from 'src/app/shared/svgs/svg-cancel.component';
import { SvgEditComponent } from 'src/app/shared/svgs/svg.edit.component';
import { ViewPolicyMatricesContainerComponent } from './view-policy-matrices/view-policy-matrices-container.component';
import { ViewPolicyMatricesComponent } from './view-policy-matrices/view-policy-matrices.component';
import { ModifyPolicyMatrixContainerComponent } from './modify-policy-matrix/modify-policy-matrix-container.component';
import { CreatePolicyMatrixContainerComponent } from './create-policy-matrix/create-policy-matrix-container.component';


@NgModule({
  declarations: [
    CreatePolicyMatrixContainerComponent,
    PolicyMatrixComponent,
    ViewPolicyMatricesContainerComponent,
    ViewPolicyMatricesComponent,
    ModifyPolicyMatrixContainerComponent
  ],
  imports: [
    CommonModule,
    PolicyMatrixRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MessageComponent,
    FormValidationComponent,
    SvgCancelComponent,
    SvgEditComponent
  ],
  providers: [
    PolicyMatrixResolver
  ]
})
export class PolicyMatrixModule { }
