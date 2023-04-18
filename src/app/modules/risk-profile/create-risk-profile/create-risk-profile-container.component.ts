import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { LabelValue, RiskProfile } from 'src/app/shared/models';
import { initialAppFormState, RiskPolicyFormState } from '../risk-profile.component';
import { RiskProfileService } from '../risk-profile.service';

@Component({
    selector: 'app-create-risk-profile-container',
    template: `
        <app-risk-profile
            [appFormState]="(appFormState$ | async)!"
            (getAttributeValuesEvent)="getAttributeValues($event)"
            (addedAttributeEvent)="addedAttribute($event)"
            (deletedAttributeEvent)="deletedAttribute($event)"
            (createRiskProfileEvent)="createRiskProfile($event)"
        ></app-risk-profile>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRiskProfileContainerComponent implements OnInit, OnDestroy {
    appFormState$ = new BehaviorSubject<RiskPolicyFormState>(initialAppFormState);

    private destroy$ = new Subject<boolean>();

    constructor(private riskPolicyService: RiskProfileService) {}

    ngOnInit(): void {
        // TODO: Uncomment to fetch attribute names from the backend
        // this.riskPolicyService.getAttributeNames()
        // .pipe(
        //     tap(attributeNames => {
        //         this.appFormState$.next({
        //             ...this.appFormState$.value,
        //             attributeNames
        //         });
        //     }),
        //     takeUntil(this.destroy$)
        // )
        // .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    getAttributeValues(attributeName: string): void {
        this.riskPolicyService
            .getAttributeValue(attributeName)
            .pipe(
                tap((attributeValues) => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        attributeValues
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    addedAttribute(attributeName: string) {
        const attributeNames = this.appFormState$.value.attributeNames.filter((attr) => attr.value != attributeName);
        this.appFormState$.next({
            ...this.appFormState$.value,
            attributeNames,
            attributeValues: []
        });
    }

    deletedAttribute(attributeName: string) {
        const attributeNameItem = this.getAttributeNameItem(attributeName);
        const attributeNames = [...this.appFormState$.value.attributeNames, attributeNameItem];
        this.appFormState$.next({
            ...this.appFormState$.value,
            attributeNames
        });
    }

    createRiskProfile(riskProfile: RiskProfile): void {
        this.appFormState$.next({
            ...this.appFormState$.value,
            processing: true,
            message: '',
            hasError: false
        });

        this.riskPolicyService
            .createRiskProfile(riskProfile)
            .pipe(
                tap(() => {
                    this.appFormState$.next({
                        ...this.appFormState$.value,
                        hasError: false,
                        processing: false,
                        message: 'Risk profile created succesfully.'
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
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    private getAttributeNameItem(attributeName: string): LabelValue {
        return this.appFormState$.value.attributeNamesTracker.find((attr) => attr.value === attributeName)!;
    }
}
