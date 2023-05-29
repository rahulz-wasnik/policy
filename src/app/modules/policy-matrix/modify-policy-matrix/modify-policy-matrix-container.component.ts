import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, BehaviorSubject, Subject, forkJoin, combineLatestWith } from 'rxjs';
import { PolicyMatrixService } from '../policy-matrix.service';

import { PolicyMatrixResponse } from '../../../shared/models';
import { CreateModifyFormState } from '../policy-matrix.component';

export const initialAppFormState: CreateModifyFormState = {
    policyMatrixResponse: null,
    processing: false,
    hasError: false,
    message: '',
    riskProfiles: [],
    policies: []
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

    constructor(private route: ActivatedRoute, private policyMatrixService: PolicyMatrixService) { }

    ngOnInit(): void {

        forkJoin({
            policies: this.policyMatrixService.getPolicies()
        }).pipe(
            combineLatestWith(this.policyMatrixService.policyMatrixResponse$),
            tap(([{ policies }, policyMatrixResponse]) => {
                console.log(policies, policyMatrixResponse);
                this.appFormState$.next({
                    ...this.appFormState$.value,
                    policyMatrixResponse,
                    policies
                });
            }),
            takeUntil(this.destroy$)
        )
            .subscribe();

        // this.policyMatrixService.policyMatrixResponse$
        //     .pipe(
        //         tap((policyMatrixResponse) => {


        //             this.appFormState$.next({
        //                 ...this.appFormState$.value,
        //                 policyMatrixResponse
        //             });
        //         }),
        //         takeUntil(this.destroy$)
        //     )
        //     .subscribe();
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
