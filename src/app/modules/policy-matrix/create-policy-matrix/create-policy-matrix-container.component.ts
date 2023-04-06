import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, finalize, BehaviorSubject, Subject } from 'rxjs';
import { PolicyMatrixService } from 'src/app/shared/services/policy-matrix.service';

import { PolicyMatrix } from '../../../shared/models';
import { CreateModifyFormState } from '../policy-matrix.component';


export const initialAppFormState: CreateModifyFormState = {
    processing: false,
    hasError: false,
    message: '',
    riskProfiles: [],
    policies: [],
    policyMatrixResponse: null
};

@Component({
    selector: 'app-create-policy-matrix-container',
    template: `
    <app-policy-matrix
        [appFormState] = "(appFormState$ | async)!"
        (onCreatePolicyMatrix)="createPolicyMatrix($event)"
    ></app-policy-matrix>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePolicyMatrixContainerComponent implements OnInit, OnDestroy {

    appFormState$ = new BehaviorSubject<CreateModifyFormState>(initialAppFormState);

    protected destroy$ = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private policyMatrixService: PolicyMatrixService) {}

    ngOnInit(): void {
        const { riskProfiles, policies } = this.route.snapshot.data['value'];
        this.appFormState$.next({
            ...this.appFormState$.value,
            riskProfiles,
            policies
        });
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

}