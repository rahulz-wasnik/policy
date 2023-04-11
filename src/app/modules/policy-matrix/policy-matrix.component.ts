import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
    AppFormState,
    PolicyMatrix,
    PolicyMatrixResponse,
    RequiredPolicies,
    RiskProfiles,
    ViewModifyPolicyMatrixForm
} from '../../shared/models';
import { markFormGroupTouched } from 'src/app/shared/utils';

export interface CreateModifyFormState extends AppFormState {
    policyMatrixResponse: PolicyMatrixResponse | null;
    riskProfiles: RiskProfiles;
    policies: RequiredPolicies;
    fetchingRiskProfiles: boolean;
}

@Component({
    selector: 'app-policy-matrix',
    templateUrl: './policy-matrix.component.html',
    styleUrls: ['./policy-matrix.component.scss']
})
export class PolicyMatrixComponent implements OnChanges {
    @Input() appFormState!: CreateModifyFormState;
    @Output() createPolicyMatrixEvent = new EventEmitter<PolicyMatrix>();
    @Output() updatePolicyMatrixEvent = new EventEmitter<PolicyMatrixResponse>();
    @Output() getRiskProfilesByReleaseTypeEvent = new EventEmitter<string>();

    policyMatrixResponseId!: number;

    appForm: FormGroup<ViewModifyPolicyMatrixForm> = new FormGroup<ViewModifyPolicyMatrixForm>({
        applicationType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        releaseType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        riskProfile: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
        requiredPolicies: new FormControl([], { nonNullable: true, validators: [Validators.required] })
    });

    get applicationType(): FormControl {
        return this.appForm.get('applicationType') as FormControl;
    }

    get releaseType(): FormControl {
        return this.appForm.get('releaseType') as FormControl;
    }

    get riskProfile(): FormControl {
        return this.appForm.get('riskProfile') as FormControl;
    }

    get requiredPolicies(): FormControl {
        return this.appForm.get('requiredPolicies') as FormControl;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const state: CreateModifyFormState = changes['appFormState']?.currentValue ?? null;
        if (state) {
            const { riskProfiles, policyMatrixResponse } = state;

            if (riskProfiles?.length > 0) {
                this.riskProfile.enable();
                this.riskProfile.addValidators([Validators.required]);
                this.riskProfile.updateValueAndValidity();
            }

            if (policyMatrixResponse) {
                const { id, ...policyMatrix } = policyMatrixResponse;
                this.policyMatrixResponseId = id;
                this.appForm.patchValue({
                    ...policyMatrix
                });
            }
        }
    }

    getRiskProfilesByReleaseType(): void {
        this.getRiskProfilesByReleaseTypeEvent.next(this.releaseType.value);
    }

    createPolicyMatrix(): void {
        markFormGroupTouched(this.appForm);
        if (this.appForm.valid) {
            this.createPolicyMatrixEvent.emit(this.appForm.getRawValue());
        }
    }

    updatePolicyMatrix(): void {
        markFormGroupTouched(this.appForm);
        if (this.appForm.valid) {
            this.updatePolicyMatrixEvent.emit({
                id: this.policyMatrixResponseId,
                ...this.appForm.getRawValue()
            });
        }
    }
}
