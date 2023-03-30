import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

import { markFormGroupTouched } from '../../shared/utils';
import { PolicyForm, PolicyPhase } from '../../shared/models';
import { PolicyService } from '../../shared/services/policy.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit, OnDestroy {

  createPolicyForm: FormGroup<PolicyForm> = new FormGroup<PolicyForm>({
    phase: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', {nonNullable: true})
  });

  phases!: Array<PolicyPhase>;

  processing: boolean = false;

  destroy$ = new Subject<boolean>(); 

  constructor(private policyService: PolicyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.phases = this.route.snapshot.data['phases'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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
      this.processing = true;
      this.policyService.createPolicy(this.createPolicyForm.getRawValue())
      .pipe(
        tap((value) => this.processing = false),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }
}
 