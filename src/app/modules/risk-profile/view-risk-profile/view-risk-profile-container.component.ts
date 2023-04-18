import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { AppFormState, RiskProfileResponse } from 'src/app/shared/models';
import { RiskProfileService } from '../risk-profile.service';

export interface ViewPolicyMatricesState extends AppFormState {
    policyMatrices: RiskProfileResponse[];
    fetchInProcess: boolean;
    fetchError: boolean;
    idToBeDeleted: number | null;
}

export const initialState: ViewPolicyMatricesState = {
    fetchInProcess: true,
    fetchError: false,
    processing: false,
    hasError: false,
    message: '',
    policyMatrices: [],
    idToBeDeleted: null
};

@Component({
    selector: 'app-view-risk-policyr-matrices',
    template: `
        <app-view-risk-policy
            [state]="(state$ | async)!"
            (deleteRiskProfileEvent)="deleteRiskProfile($event)"
            (updateRiskProfileEvent)="updateRiskProfile($event)"
        ></app-view-risk-policy>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPolicyMatricesContainerComponent implements OnInit {
    state$ = new BehaviorSubject<ViewPolicyMatricesState>(initialState);

    private destroy$ = new Subject<boolean>();

    constructor(private riskProfileService: RiskProfileService, private router: Router) {}

    ngOnInit(): void {
        this.riskProfileService
            .getRiskProfiles()
            .pipe(
                tap(() => {
                    this.state$.next({
                        ...this.state$.value,
                        fetchInProcess: false
                    });
                }),
                catchError(() => {
                    this.state$.next({
                        ...this.state$.value,
                        fetchInProcess: false,
                        fetchError: true,
                        message: 'An error occured in fetching policy matrices.'
                    });
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    updateRiskProfile(riskProfileResponse: RiskProfileResponse): void {}
}
