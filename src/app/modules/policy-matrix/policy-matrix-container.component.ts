import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, finalize, BehaviorSubject, Subject } from 'rxjs';
import { PolicyMatrixService } from 'src/app/shared/services/policy-matrix.service';

import { AppFormState, PolicyMatrix, PolicyMatrixResponse, RequiredPolicies, RiskProfiles } from '../../shared/models';

export interface ViewModifyFormState extends AppFormState {
    policyMatrixResponse: PolicyMatrixResponse | null;
    riskProfiles: RiskProfiles;
    policies: RequiredPolicies;
}

export const initialAppFormState: ViewModifyFormState = {
    policyMatrixResponse: null,
    processing: false,
    hasError: false,
    message: '',
    riskProfiles: [],
    policies: []
};

@Component({
    selector: 'app-policy-matrix-container',
    template: `
    <app-policy-matrix
        [appFormState] = "(appFormState$ | async)!"
        (onCreatePolicyMatrix)="createPolicyMatrix($event)"
        (onUpdatePolicyMatrix)="updatePolicyMatrix($event)"
    ></app-policy-matrix>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyMatrixContainerComponent implements OnInit, OnDestroy {

    appFormState$ = new BehaviorSubject<ViewModifyFormState>(initialAppFormState);

    protected destroy$ = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private policyMatrixService: PolicyMatrixService) {}

    ngOnInit(): void {
        const { riskProfiles, policies } = this.route.snapshot.data['value'];
        this.appFormState$.next({
            ...this.appFormState$.value,
            riskProfiles,
            policies
        });

        this.policyMatrixService.policyMatrixResponse$
            .pipe(
                tap(policyMatrixResponse => {
                    if (policyMatrixResponse == null) {
                        return;
                    }

                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        policyMatrixResponse
                    });
                }),
                finalize(() => this.policyMatrixService.policyMatrixResponse$.next(null)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    createPolicyMatrix(policyMatrix: PolicyMatrix): void {

        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        this.policyMatrixService.createPolicyMatrix(policyMatrix)
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
                takeUntil(this.destroy$),
            ).subscribe();
    }

    updatePolicyMatrix(policyMatrixResponse: PolicyMatrixResponse): void {

        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        const { id, ...policyMatrix } = policyMatrixResponse; 

        this.policyMatrixService.updatePolicyMatrix(id, policyMatrix)
            .pipe(
                tap(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: false,
                        processing: false,
                        message: 'Policy updated successfully.'
                    });
                }),
                catchError(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: true,
                        processing: false,
                        message: 'An error occured.'
                    });
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            ).subscribe();
    }

}