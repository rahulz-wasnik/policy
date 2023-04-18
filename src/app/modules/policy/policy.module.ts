import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PolicyComponent } from './policy.component';
import { FormValidationComponent } from '../../shared/components/form-validation/form-validation.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { CreatePolicyContainerComponent } from './create-policy/create-policy-container.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyService } from './policy.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { SvgEditComponent } from 'src/app/shared/svgs/svg.edit.component';
import { ViewPolicyContainerComponent } from './view-policy/view-policy-container.component';
import { ModifyPolicyContainerComponent } from './modify-policy/modify-policy-container';

@NgModule({
    declarations: [CreatePolicyContainerComponent, PolicyComponent, ViewPolicyComponent, ViewPolicyContainerComponent, ModifyPolicyContainerComponent],
    imports: [
        CommonModule,
        PolicyRoutingModule,
        ReactiveFormsModule,
        FormValidationComponent,
        MessageComponent,
        NgSelectModule,
        SvgEditComponent
    ],
    providers: [PolicyService]
})
export class PolicyModule {}
