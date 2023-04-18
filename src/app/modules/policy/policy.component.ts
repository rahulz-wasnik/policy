import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { markFormGroupTouched } from '../../shared/utils';
import { AppFormState, Policy, PolicyForm, PolicyPhases, PolicyResponse, RequiredFacts } from '../../shared/models';

// TODO: Remove hardcoding
const requiredFacts: RequiredFacts = [
    {
        label: 'a',
        value: 'a'
    }
];
const policyPhases: PolicyPhases = [
    {
        label: 'a',
        value: 'a'
    }
];

export interface CreateModifyPolicyFormState extends AppFormState {
    policyResponse: PolicyResponse | null;
    policyPhases: PolicyPhases;
    requiredFacts: RequiredFacts;
}

export const initialAppFormState: CreateModifyPolicyFormState = {
    processing: false,
    hasError: false,
    message: '',
    // TODO: Remove hardcoded values
    policyPhases,
    requiredFacts,
    policyResponse: null
};

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
    @Input() appFormState!: CreateModifyPolicyFormState;
    @Output() createPolicyEvent = new EventEmitter<Policy>();
    @Output() updatePolicyEvent = new EventEmitter<PolicyResponse>();

    policyResponse!: PolicyResponse;

    appForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
        policyPhase: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        policyName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        policyDescription: new FormControl('', { nonNullable: true }),
        requiredFacts: new FormControl([], { nonNullable: true, validators: [Validators.required] })
    });

    get policyPhase(): FormControl {
        return this.appForm.get('policyPhase') as FormControl;
    }

    get policyName(): FormControl {
        return this.appForm.get('policyName') as FormControl;
    }

    get requiredFacts(): FormControl {
        return this.appForm.get('requiredFacts') as FormControl;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appFormState']?.currentValue?.policyResponse) {
            this.policyResponse = changes['appFormState'].currentValue.policyResponse;
            this.appForm.patchValue({
                ...this.policyResponse
            });
        }
    }

    createPolicy(): void {
        markFormGroupTouched(this.appForm);

        if (this.appForm.valid) {
            this.createPolicyEvent.emit(this.appForm.getRawValue());
        }
    }

    updatePolicy(): void {
        markFormGroupTouched(this.appForm);
        if (this.appForm.valid) {
            this.updatePolicyEvent.emit({
                id: this.policyResponse.id,
                ...this.appForm.getRawValue()
            });
        }
    }
}
