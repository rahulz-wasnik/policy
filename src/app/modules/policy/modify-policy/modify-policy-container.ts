import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap, catchError, EMPTY, BehaviorSubject, Subject } from 'rxjs';
import { routeConstants } from 'src/app/shared/constants';

import { PolicyResponse } from '../../../shared/models';
import { CreateModifyPolicyFormState, initialAppFormState } from '../policy.component';
import { PolicyService } from '../policy.service';

@Component({
    selector: 'app-modify-policy-container',
    template: `
        <app-policy
            [appFormState]="(appFormState$ | async)!"
            (updatePolicyEvent)="updatePolicy($event)"
        ></app-policy>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyPolicyContainerComponent implements OnInit, OnDestroy {
    appFormState$ = new BehaviorSubject<CreateModifyPolicyFormState>(initialAppFormState);

    protected destroy$ = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private policyMatrixService: PolicyService, private router: Router) {}

    ngOnInit(): void {
        this.policyMatrixService.policyResponse$
            .pipe(
                tap((policyResponse) => {
                    if (policyResponse == null) {
                        this.router.navigateByUrl(routeConstants.POLICY + '/' + routeConstants.CREATE);
                    }

                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        policyResponse
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
        this.policyMatrixService.policyResponse$.next(null);
    }

    updatePolicy(policyResponse: PolicyResponse): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        const { id, ...policy } = policyResponse;

        this.policyMatrixService
            .updatePolicy(id, policy)
            .pipe(
                tap(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: false,
                        processing: false,
                        message: 'Policy updated successfully.'
                    });

                    this.policyMatrixService.policyResponse$.next(policyResponse);
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
