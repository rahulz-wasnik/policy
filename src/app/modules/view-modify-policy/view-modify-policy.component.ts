import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap, catchError, EMPTY } from 'rxjs';

import { PolicyService } from '../../shared/services/policy.service';
import { RiskProfile, ViewModifyForm } from '../../shared/models';
import { markFormGroupTouched } from 'src/app/shared/utils';
import { AppForm } from '../../shared/classes/app-form';

@Component({
  selector: 'app-view-modify-policy',
  templateUrl: './view-modify-policy.component.html',
  styleUrls: ['./view-modify-policy.component.scss']
})
export class ViewModifyPolicyComponent extends AppForm implements OnInit, OnDestroy {

  viewModifyPolicyForm: FormGroup<ViewModifyForm> = new FormGroup<ViewModifyForm>({
    applicationType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    releaseType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    riskProfile: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    requiredPolicies: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
  });


  riskProfiles!: RiskProfile;

  policies!: RiskProfile;


  constructor(private route: ActivatedRoute, private policyService: PolicyService) { super(); }


  ngOnInit(): void {
    const { riskProfiles, policies } = this.route.snapshot.data['value'];
    this.riskProfiles = riskProfiles;
    this.policies = policies;
  }

  ngOnDestroy(): void {
    this.beforeComponentDestroy();
  }

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

  createPolicyMatrix(): void {

    markFormGroupTouched(this.viewModifyPolicyForm);

    if (this.viewModifyPolicyForm.valid) {
      this.reset();

      this.policyService.createPolicyMatrix(this.viewModifyPolicyForm.getRawValue())
        .pipe(
          tap((value) => {
            this.processing = false;
            this.message = value;
          }),
          catchError(() => {
            this.processing = false;
            this.hasErrorPostProcessing = true;
            this.message = 'An error occured during creation.';
            return EMPTY;
          }),
          takeUntil(this.destroy$),
        ).subscribe();

    }
  }

}