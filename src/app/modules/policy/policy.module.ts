import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePolicyComponent } from './create-policy.component';
import { CreatePolicyResolver } from './create-policy.resolver';
import { FormValidationComponent } from '../../shared/components/form-validation/form-validation.component';
import { MessageComponent } from '../../shared/components/message/message.component';
import { CreatePolicyContainerComponent } from './create-policy-container.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyService } from './policy.service';

@NgModule({
    declarations: [CreatePolicyContainerComponent, CreatePolicyComponent],
    imports: [CommonModule, PolicyRoutingModule, ReactiveFormsModule, FormValidationComponent, MessageComponent],
    providers: [CreatePolicyResolver, PolicyService]
})
export class PolicyModule {}
