import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PolicyMatrix, PolicyMatrixResponse, ViewModifyForm } from '../../shared/models';
import { markFormGroupTouched } from 'src/app/shared/utils';
import { ViewModifyFormState } from './view-modify-policy-container.component';

@Component({
  selector: 'app-view-modify-policy',
  templateUrl: './view-modify-policy.component.html',
  styleUrls: ['./view-modify-policy.component.scss']
})
export class ViewModifyPolicyComponent implements OnChanges {

  @Input() appFormState!: ViewModifyFormState;
  @Output() onCreatePolicyMatrix = new EventEmitter<PolicyMatrix>();
  @Output() onUpdatePolicyMatrix = new EventEmitter<PolicyMatrixResponse>();

  policyMatrixResponse!: PolicyMatrixResponse;

  viewModifyPolicyForm: FormGroup<ViewModifyForm> = new FormGroup<ViewModifyForm>({
    applicationType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    releaseType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    riskProfile: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    requiredPolicies: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
  });

  get applicationType(): FormControl {
    return this.viewModifyPolicyForm.get('applicationType') as FormControl;
  }

  get releaseType(): FormControl {
    return this.viewModifyPolicyForm.get('releaseType') as FormControl;
  }

  get riskProfile(): FormControl {
    return this.viewModifyPolicyForm.get('riskProfile') as FormControl;
  }

  get requiredPolicies(): FormControl {
    return this.viewModifyPolicyForm.get('requiredPolicies') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appFormState']?.currentValue?.policyMatrixResponse) {
      this.policyMatrixResponse = changes['appFormState'].currentValue.policyMatrixResponse;
      this.viewModifyPolicyForm.patchValue({
        ...this.policyMatrixResponse
      });
    }
  }

  createPolicyMatrix(): void {
    markFormGroupTouched(this.viewModifyPolicyForm);
    if (this.viewModifyPolicyForm.valid) {
      this.onCreatePolicyMatrix.emit(this.viewModifyPolicyForm.getRawValue());
    }
  }

  updatePolicyMatrix(): void {
    markFormGroupTouched(this.viewModifyPolicyForm);
    if (this.viewModifyPolicyForm.valid) {
      this.onUpdatePolicyMatrix.emit({
        id: this.policyMatrixResponse.id,
        ...this.viewModifyPolicyForm.getRawValue()
      });
    }
  }

}