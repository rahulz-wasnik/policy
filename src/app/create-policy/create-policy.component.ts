import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PolicyForm, PolicyPhase } from '../shared/models';
import { PolicyService } from '../shared/services/policy.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit {

  createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
    phase: new FormControl('', {nonNullable: true}),
    name: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });

  phases!: Array<PolicyPhase>;

  constructor(private policyService: PolicyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.phases = this.route.snapshot.data['phases'];
  }

  createPolicy(): void {
    if (this.createPolicyForm.valid) {
      this.policyService.createPolicy(this.createPolicyForm.getRawValue());
    }
  }
}
 