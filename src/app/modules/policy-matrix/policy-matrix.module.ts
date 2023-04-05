import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PolicyMatrixRoutingModule } from './policy-matrix-routing.module';
import { PolicyMatrixComponent } from './policy-matrix.component';
import { PolicyMatrixContainerComponent } from './policy-matrix-container.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { FormValidationComponent } from '../../shared/components/form-validation/form-validation.component';
import { PolicyMatrixResolver } from './policy-matrix.resolver';


@NgModule({
  declarations: [
    PolicyMatrixContainerComponent,
    PolicyMatrixComponent
  ],
  imports: [
    CommonModule,
    PolicyMatrixRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MessageComponent,
    FormValidationComponent
  ],
  providers: [
    PolicyMatrixResolver
  ]
})
export class PolicyMatrixModule { }
