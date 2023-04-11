import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, BehaviorSubject, Subject } from 'rxjs';
import { PolicyMatrixService } from '../policy-matrix.service';

import { PolicyMatrix } from '../../../shared/models';
import { CreateModifyFormState } from '../policy-matrix.component';
import { RiskProfileService } from '../../../shared/services/risk-profile.service';

export const initialAppFormState: CreateModifyFormState = {
    processing: false,
    hasError: false,
    message: '',
    riskProfiles: [],
    policies: [],
    policyMatrixResponse: null,
    fetchingRiskProfiles: false
};

@Component({
    selector: 'app-create-policy-matrix-container',
    template: `
        <app-policy-matrix
            [appFormState]="(appFormState$ | async)!"
            (createPolicyMatrixEvent)="createPolicyMatrix($event)"
            (getRiskProfilesByReleaseTypeEvent)="getRiskProfilesByReleaseType($event)"
        ></app-policy-matrix>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePolicyMatrixContainerComponent implements OnInit, OnDestroy {
    appFormState$ = new BehaviorSubject<CreateModifyFormState>(initialAppFormState);

    protected destroy$ = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
        private policyMatrixService: PolicyMatrixService,
        private riskProfileService: RiskProfileService
    ) {}

    ngOnInit(): void {
        const { policies } = this.route.snapshot.data['value'];
        this.appFormState$.next({
            ...this.appFormState$.value,
            policies
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    getRiskProfilesByReleaseType(id: string): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            fetchingRiskProfiles: true
        });

        this.riskProfileService
            .getRiskProfilesByReleaseType(id)
            .pipe(
                tap((riskProfiles) => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        fetchingRiskProfiles: false,
                        riskProfiles
                    });
                }),
                catchError(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: true,
                        fetchingRiskProfiles: false,
                        message: 'Error occured in fetching risk profiles.'
                    });
                    return EMPTY;
                })
            )
            .subscribe();
    }

    createPolicyMatrix(policyMatrix: PolicyMatrix): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        this.policyMatrixService
            .createPolicyMatrix(policyMatrix)
            .pipe(
                tap((message) => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: false,
                        processing: false,
                        message
                    });
                }),
                catchError(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: true,
                        processing: false,
                        message: 'Error occured during creation.'
                    });
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
