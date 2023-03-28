import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PolicyForm } from '../models';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent {

  createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
    name: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });

  constructor(private policyService: PolicyService) {}

  createPolicy(): void {
    if (this.createPolicyForm.valid) {
      this.policyService.createPolicy(this.createPolicyForm.getRawValue());
    }
  }
}
 