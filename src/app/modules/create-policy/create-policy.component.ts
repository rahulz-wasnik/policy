import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { markFormGroupTouched } from '../../shared/utils';
import { Policy, PolicyForm } from '../../shared/models';
import { CreatePolicyFormState } from './create-policy-container.component';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent {

  @Input() appFormState!: CreatePolicyFormState;
  @Output() onCreatePolicy = new EventEmitter<Policy>();

  createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
    phase: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true })
  });

  get phase(): FormControl {
    return this.createPolicyForm.get('phase') as FormControl;
  }

  get name(): FormControl {
    return this.createPolicyForm.get('name') as FormControl;
  }

  createPolicy(): void {

    markFormGroupTouched(this.createPolicyForm);

    if (this.createPolicyForm.valid) {
      this.onCreatePolicy.emit(this.createPolicyForm.getRawValue());
    }
  }

}
