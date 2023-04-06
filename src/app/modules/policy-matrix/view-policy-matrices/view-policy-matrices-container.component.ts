import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from "rxjs";
import { routeConstants } from "src/app/shared/constants";
import { AppFormState, PolicyMatrixResponse } from "src/app/shared/models";
import { PolicyMatrixService } from "src/app/shared/services/policy-matrix.service";

export interface ViewPolicyMatricesState extends AppFormState {
    policyMatrices: PolicyMatrixResponse[];
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
}

@Component({
    selector: 'app-view-policy-container-matrices',
    template: `
        <app-view-policy-matrices
            [state]="(state$ | async)!"
            (onDeletePolicyMatrix)="deletePolicyMatrix($event)" 
            (onUpdatePolicyMatrix)="updatePolicyMatrix($event)" 
        ></app-view-policy-matrices>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPolicyMatricesContainerComponent implements OnInit {

    state$ = new BehaviorSubject<ViewPolicyMatricesState>(initialState);

    private destroy$ = new Subject<boolean>();

    constructor(private policyMatrixService: PolicyMatrixService, private router: Router) {}

    ngOnInit(): void {

        this.policyMatrixService.getPolicyMatrices()
        .pipe(
            tap((policyMatrices) => {
                this.state$.next({
                    ...this.state$.value,
                    fetchInProcess: false,
                    policyMatrices
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
        .subscribe()
    }

    deletePolicyMatrix(id: number): void {

        this.state$.next({
            ...this.state$.value,
            idToBeDeleted: id,
            hasError: false,
            processing: true
        });

        this.policyMatrixService.deletePolicyMatrix(id)
        .pipe(
            tap(() => {
                const policyMatrices = this.state$.value.policyMatrices?.filter(item => item.id !== id);
                this.state$.next({
                    ...this.state$.value,
                    policyMatrices,
                    processing: false,
                    idToBeDeleted: null
                });
            }),
            catchError(() => {

                this.state$.next({
                    ...this.state$.value,
                    processing: false,
                    hasError: true,
                    message: 'Error!' 
                });
                return EMPTY;
            }),
            takeUntil(this.destroy$)
        )
        .subscribe();
    }

    updatePolicyMatrix(policyMatrixResponse: PolicyMatrixResponse): void {
        this.policyMatrixService.policyMatrixResponse$.next(policyMatrixResponse);
        this.router.navigateByUrl(routeConstants.POLICY_MATRIX + "/" + routeConstants.MODIFY, { state: { ...policyMatrixResponse }});
    }
}