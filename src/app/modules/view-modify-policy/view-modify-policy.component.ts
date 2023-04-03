import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap, catchError, EMPTY } from 'rxjs';

import { PolicyService } from '../../shared/services/policy.service';
import { RiskProfile, ViewModifyForm } from '../../shared/models';

@Component({
  selector: 'app-view-modify-policy',
  templateUrl: './view-modify-policy.component.html',
  styleUrls: ['./view-modify-policy.component.scss']
})
export class ViewModifyPolicyComponent implements OnInit, OnDestroy {

  viewModifyPolicyForm: FormGroup<ViewModifyForm> = new FormGroup<ViewModifyForm>({
    applicationType: new FormControl('', { nonNullable: true }),
    releaseType: new FormControl('', { nonNullable: true }),
    riskProfile: new FormControl('', { nonNullable: true }),
    requiredPolicies: new FormControl([], { nonNullable: true }),
  });

  
  riskProfiles!: RiskProfile;
  
  policies!: RiskProfile;
  
  destroy$ = new Subject<boolean>();
  
  processing: boolean = false;
  
  hasErrorPostProcessing: boolean = false;

  message: string = '';

  constructor(private route: ActivatedRoute, private policyService: PolicyService) { }


  ngOnInit(): void {
    const { riskProfiles, policies } = this.route.snapshot.data['value'];
    this.riskProfiles = riskProfiles;
    this.policies = policies;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createPolicyMatrix(): void {
    
    this.reset();

    this.policyService.createPolicyMatrix(this.viewModifyPolicyForm.getRawValue())
      .pipe(
        tap(() => {
          this.processing = false;
          this.message = 'Policy matrix created successfully.';
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

  private reset(): void {
    this.message = '';
    this.processing = true;
    this.hasErrorPostProcessing = false;
  }
}