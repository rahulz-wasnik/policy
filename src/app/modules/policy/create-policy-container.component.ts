import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

import { AppFormState, Policy, PolicyPhases } from '../../shared/models';
import { PolicyService } from './policy.service';

export interface CreatePolicyFormState extends AppFormState {
    phases: PolicyPhases;
}

const initialAppFormState: CreatePolicyFormState = {
    processing: false,
    hasError: false,
    message: '',
    phases: []
};

@Component({
    selector: 'app-create-policy-container',
    template: `
        <app-create-policy [appFormState]="(appFormState$ | async)!" (createPolicyEvent)="createPolicy($event)"></app-create-policy>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePolicyContainerComponent implements OnInit, OnDestroy {
    appFormState$ = new BehaviorSubject<CreatePolicyFormState>(initialAppFormState);

    private destroy$ = new Subject<boolean>();

    constructor(private policyService: PolicyService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const phases = this.route.snapshot.data['phases'];
        this.appFormState$.next({
            ...this.appFormState$.value,
            phases
        });
    }

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
                        message: 'An error occured.'
                    });

                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
