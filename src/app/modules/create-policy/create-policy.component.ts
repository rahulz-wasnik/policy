import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

import { markFormGroupTouched } from '../../shared/utils';
import { PolicyForm, PolicyPhase } from '../../shared/models';
import { PolicyService } from '../../shared/services/policy.service';
import { AppForm } from '../../shared/classes/app-form';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent extends AppForm implements OnInit, OnDestroy {

  createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
    phase: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true })
  });

  phases!: PolicyPhase;

  constructor(private policyService: PolicyService, private route: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.phases = this.route.snapshot.data['phases'];
  }

  ngOnDestroy(): void {
    this.beforeComponentDestroy();
  }

  get phase(): FormControl {
    return this.createPolicyForm.get('phase') as FormControl;
  }

  get name(): FormControl {
    return this.createPolicyForm.get('name') as FormControl;
  }

  createPolicy(): void {

    markFormGroupTouched(this.createPolicyForm);

    if (this.createPolicyForm.valid) {
      this.reset();

      this.policyService.createPolicy(this.createPolicyForm.getRawValue())
        .pipe(
          tap(() => {
            this.processing = false;
            this.message = 'Policy created successfully.';
          }),
          takeUntil(this.destroy$),
          catchError(() => {
            this.processing = false;
            this.hasErrorPostProcessing = true;
            this.message = 'An error occured during creation.';
            return EMPTY;
          })
        ).subscribe();
    }
  }

}
