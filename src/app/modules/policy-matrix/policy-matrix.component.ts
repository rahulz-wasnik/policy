import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppFormState, PolicyMatrix, PolicyMatrixResponse, RequiredPolicies, RiskProfiles, ViewModifyPolicyMatrixForm } from '../../shared/models';
import { markFormGroupTouched } from 'src/app/shared/utils';

export interface CreateModifyFormState extends AppFormState {
  policyMatrixResponse: PolicyMatrixResponse | null;
  riskProfiles: RiskProfiles;
  policies: RequiredPolicies;
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

  policyMatrixResponse!: PolicyMatrixResponse;

  appForm: FormGroup<ViewModifyPolicyMatrixForm> = new FormGroup<ViewModifyPolicyMatrixForm>({
    applicationType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    releaseType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    riskProfile: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    requiredPolicies: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
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
    if (changes['appFormState']?.currentValue?.policyMatrixResponse) {
      this.policyMatrixResponse = changes['appFormState'].currentValue.policyMatrixResponse;
      this.appForm.patchValue({
        ...this.policyMatrixResponse
      });
    }
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
        id: this.policyMatrixResponse.id,
        ...this.appForm.getRawValue()
      });
    }
  }

}