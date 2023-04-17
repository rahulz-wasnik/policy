import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { routeConstants } from 'src/app/shared/constants';
import { AppFormState, PolicyResponse } from 'src/app/shared/models';
import { PolicyService } from '../policy.service';

export interface ViewPolicyState extends AppFormState {
    policies: PolicyResponse[];
    fetchInProcess: boolean;
    fetchError: boolean;
}

export const initialState: ViewPolicyState = {
    fetchInProcess: true,
    fetchError: false,
    processing: false,
    hasError: false,
    message: '',
    policies: []
};

@Component({
    selector: 'app-view-policy-container',
    template: `
        <app-view-policy
            [state]="(state$ | async)!"
            (updatePolicyEvent)="updatePolicy($event)"
        ></app-view-policy>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPolicyContainerComponent implements OnInit {

    state$ = new BehaviorSubject<ViewPolicyState>(initialState);

    private destroy$ = new Subject<boolean>();

    constructor(private policyService: PolicyService, private router: Router) {}

    ngOnInit(): void {
        this.policyService
            .getPolicies()
            .pipe(
                tap((policies) => {
                    this.state$.next({
                        ...this.state$.value,
                        fetchInProcess: false,
                        policies
                    });
                }),
                catchError(() => {
                    this.state$.next({
                        ...this.state$.value,
                        fetchInProcess: false,
                        fetchError: true,
                        message: 'An error occured in fetching policies.'
                    });
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    updatePolicy(policyResponse: PolicyResponse): void {
        this.policyService.policyResponse$.next(policyResponse);
        this.router.navigateByUrl(routeConstants.POLICY + '/' + routeConstants.MODIFY);
    }
}
