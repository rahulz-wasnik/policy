import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
    AppFormState,
    AttributesNames,
    AttributeValues,
    RequiredFactForm,
    RiskProfile,
    RiskProfileForm,
    RiskProfileResponse
} from '../../shared/models';

export interface RiskPolicyFormState extends AppFormState {
    attributeNames: AttributesNames;
    attributeNamesTracker: AttributesNames;
    attributeValues: AttributeValues;
    riskProfileResponse: RiskProfileResponse | null;
}

const attributeNames: AttributesNames = [
    {
        label: 'Vendor license application',
        value: 'Vendor license application'
    },
    {
        label: 'N',
        value: 'N'
    }
];

export const initialAppFormState: RiskPolicyFormState = {
    hasError: false,
    message: '',
    processing: false,
    attributeNames,
    attributeNamesTracker: attributeNames,
    attributeValues: [],
    riskProfileResponse: null
};

@Component({
    selector: 'app-risk-profile',
    templateUrl: './risk-profile.component.html',
    styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent {
    @Input() appFormState!: RiskPolicyFormState;
    @Output() addedAttributeEvent = new EventEmitter<string>();
    @Output() getAttributeValuesEvent = new EventEmitter<string>();
    @Output() deletedAttributeEvent = new EventEmitter<string>();
    @Output() addAttributeEvent = new EventEmitter<RiskProfile>();
    @Output() createRiskProfileEvent = new EventEmitter<RiskProfile>();

    appForm = new FormGroup<RiskProfileForm>({
        name: new FormControl('', { nonNullable: true }),
        description: new FormControl('', { nonNullable: true }),
        activeStatus: new FormControl('true', { nonNullable: true }),
        attributeName: new FormControl('', { nonNullable: true }),
        operator: new FormControl('', { nonNullable: true }),
        attributeValue: new FormControl('', { nonNullable: true }),
        requiredFacts: new FormArray<any>([])
    });

    get attributeName(): FormControl {
        return this.appForm.get('attributeName') as FormControl;
    }

    get attributeValue(): FormControl {
        return this.appForm.get('attributeValue') as FormControl;
    }

    get operator(): FormControl {
        return this.appForm.get('operator') as FormControl;
    }

    get requiredFacts(): FormArray {
        return this.appForm.get('requiredFacts') as FormArray;
    }

    getAttributeValues(): void {
        this.getAttributeValuesEvent.next(this.attributeName.value);
    }

    addAttribute(): void {
        const requiredFactForm = new FormGroup<RequiredFactForm>({
            attributeName: new FormControl({ value: this.attributeName.value, disabled: true }),
            attributeValue: new FormControl({ value: this.attributeValue.value, disabled: true }),
            operator: new FormControl({ value: this.operator.value, disabled: true })
        });

        this.requiredFacts.push(requiredFactForm);
        this.addedAttributeEvent.next(this.attributeName.value);

        this.appForm.patchValue({
            attributeName: '',
            attributeValue: '',
            operator: ''
        });
    }

    createRiskProfile(): void {
        const { name, description, requiredFacts, activeStatus } = this.appForm.getRawValue();
        this.createRiskProfileEvent.next({ name, description, activeStatus, requiredFacts });
    }

    // TODO: To be added
    updateRiskProfile(): void {}

    deleteAttribute(index: number): void {
        const requiredFactForm = this.requiredFacts.controls[index];
        const attributeName = requiredFactForm.get('attributeName')?.value;
        this.deletedAttributeEvent.next(attributeName);
        this.requiredFacts.controls.splice(index, 1);
    }
}
