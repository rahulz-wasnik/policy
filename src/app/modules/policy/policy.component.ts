import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { markFormGroupTouched } from '../../shared/utils';
import { AppFormState, Policy, PolicyForm, PolicyPhases, PolicyResponse, RequiredFacts } from '../../shared/models';

export interface CreateModifyPolicyFormState extends AppFormState {
    policyResponse: PolicyResponse | null;
    phases: PolicyPhases;
    requiredFacts: RequiredFacts;
}

export const initialAppFormState: CreateModifyPolicyFormState = {
    processing: false,
    hasError: false,
    message: '',
    // TODO: Remove hardcoded values
    phases: [],
    requiredFacts: [],
    policyResponse: null
};

// TODO: Remove hardcoding
const requiredFacts: RequiredFacts = [];
const phases: PolicyPhases = [];

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
    @Input() appFormState!: CreateModifyPolicyFormState;
    @Output() createPolicyEvent = new EventEmitter<Policy>();

    createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
        policyPhase: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        policyName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        policyDescription: new FormControl('', { nonNullable: true }),
        requiredFacts: new FormControl([], { nonNullable: true, validators: [Validators.required] })
    });

    get policyPhase(): FormControl {
        return this.createPolicyForm.get('policyPhase') as FormControl;
    }

    get policyName(): FormControl {
        return this.createPolicyForm.get('policyName') as FormControl;
    }

    get requiredFacts(): FormControl {
        return this.createPolicyForm.get('requiredFacts') as FormControl;
    }

    createPolicy(): void {
        markFormGroupTouched(this.createPolicyForm);

        if (this.createPolicyForm.valid) {
            this.createPolicyEvent.emit(this.createPolicyForm.getRawValue());
        }
    }
}
