import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

import { Policy } from '../../../shared/models';
import { CreateModifyPolicyFormState, initialAppFormState } from '../policy.component';
import { PolicyService } from '../policy.service';

@Component({
    selector: 'app-create-policy-container',
    template: ` <app-policy [appFormState]="(appFormState$ | async)!" (createPolicyEvent)="createPolicy($event)"></app-policy> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePolicyContainerComponent implements OnDestroy {
    appFormState$ = new BehaviorSubject<CreateModifyPolicyFormState>(initialAppFormState);

    private destroy$ = new Subject<boolean>();

    constructor(private policyService: PolicyService, private route: ActivatedRoute) {}

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    createPolicy(policy: Policy): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            hasError: false,
            message: '',
            processing: true
        });

        this.policyService
            .createPolicy(policy)
            .pipe(
                tap(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        processing: false,
                        message: 'Policy created successfully.'
                    });
                }),
                catchError(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        processing: false,
                        hasError: true,
                        message: 'Error occured during creation'
                    });

                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
