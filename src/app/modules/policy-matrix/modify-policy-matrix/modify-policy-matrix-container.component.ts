import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { PolicyMatrixService } from '../policy-matrix.service';

import { PolicyMatrixResponse } from '../../../shared/models';
import { CreateModifyFormState } from '../policy-matrix.component';
import { RiskProfileService } from '../../../shared/services/risk-profile.service';

export const initialAppFormState: CreateModifyFormState = {
    policyMatrixResponse: null,
    processing: false,
    hasError: false,
    message: '',
    riskProfiles: [],
    policies: [],
    fetchingRiskProfiles: false
};

@Component({
    selector: 'app-modify-policy-matrix-container',
    template: `
        <app-policy-matrix
            [appFormState]="(appFormState$ | async)!"
            (updatePolicyMatrixEvent)="updatePolicyMatrix($event)"
        ></app-policy-matrix>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyPolicyMatrixContainerComponent implements OnInit, OnDestroy {
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

        combineLatest({
            riskProfiles: this.riskProfileService.getRiskProfiles(),
            policyMatrixResponse: this.policyMatrixService.policyMatrixResponse$
        })
            .pipe(
                tap(({ riskProfiles, policyMatrixResponse }) => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        riskProfiles,
                        policyMatrixResponse
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
        this.policyMatrixService.policyMatrixResponse$.next(null);
    }

    updatePolicyMatrix(policyMatrixResponse: PolicyMatrixResponse): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        const { id, ...policyMatrix } = policyMatrixResponse;

        this.policyMatrixService
            .updatePolicyMatrix(id, policyMatrix)
            .pipe(
                tap(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: false,
                        processing: false,
                        message: 'Policy updated successfully.'
                    });

                    this.policyMatrixService.policyMatrixResponse$.next(policyMatrixResponse);
                }),
                catchError(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: true,
                        processing: false,
                        message: 'An error occured during updation.'
                    });
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
