import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PolicyMatrix, PolicyMatrixResponse, ViewModifyPolicyMatrixForm } from '../../shared/models';
import { markFormGroupTouched } from 'src/app/shared/utils';
import { ViewModifyFormState } from './policy-matrix-container.component';

@Component({
  selector: 'app-policy-matrix',
  templateUrl: './policy-matrix.component.html',
  styleUrls: ['./policy-matrix.component.scss']
})
export class PolicyMatrixComponent implements OnChanges {

  @Input() appFormState!: ViewModifyFormState;
  @Output() onCreatePolicyMatrix = new EventEmitter<PolicyMatrix>();
  @Output() onUpdatePolicyMatrix = new EventEmitter<PolicyMatrixResponse>();

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
      this.onCreatePolicyMatrix.emit(this.appForm.getRawValue());
    }
  }

  updatePolicyMatrix(): void {
    markFormGroupTouched(this.appForm);
    if (this.appForm.valid) {
      this.onUpdatePolicyMatrix.emit({
        id: this.policyMatrixResponse.id,
        ...this.appForm.getRawValue()
      });
    }
  }

}