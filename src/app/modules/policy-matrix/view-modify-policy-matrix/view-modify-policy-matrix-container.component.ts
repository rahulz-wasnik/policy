import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from "rxjs";
import { AppFormState, PolicyMatrixResponse } from "src/app/shared/models";
import { PolicyMatrixService } from "src/app/shared/services/policy-matrix.service";

export interface ViewModifyPolicyMatrixState extends AppFormState {
    policyMatrices: PolicyMatrixResponse[];
    idToDelete: number | null;
}

export const initialState: ViewModifyPolicyMatrixState = {
    processing: false,
    hasError: false,
    message: '',
    policyMatrices: [],
    idToDelete: null
}

@Component({
    selector: 'app-view-modify-policy-container-matrix',
    template: `
        <app-view-modify-policy-matrix
            [state]="(state$ | async)!"
            (onDelete)="deletePolicyMatrix($event)" 
        ></app-view-modify-policy-matrix>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewModifyPolicyMatrixContainerComponent implements OnInit {

    state$ = new BehaviorSubject<ViewModifyPolicyMatrixState>(initialState);

    private destroy$ = new Subject<boolean>();

    constructor(private policyMatrixService: PolicyMatrixService) {}

    ngOnInit(): void {

        this.policyMatrixService.getPolicyMatrices()
        .pipe(
            tap((policyMatrices) => {
                this.state$.next({
                    ...this.state$.value,
                    policyMatrices
                });
            }),
            catchError(() => {

                this.state$.next({
                    ...this.state$.value,
                    processing: false,
                    hasError: true,
                    message: 'An error occured.' 
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
            idToDelete: id,
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
                    idToDelete: null
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
}