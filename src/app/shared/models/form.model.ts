import { FormArray, FormControl } from '@angular/forms';

export interface PolicyForm {
    policyPhase: FormControl<string>;
    policyName: FormControl<string>;
    policyDescription: FormControl<string>;
    requiredFacts: FormControl<Array<string>>;
}

export interface ViewModifyPolicyMatrixForm {
    applicationType: FormControl<string>;
    releaseType: FormControl<string>;
    riskProfile: FormControl<string>;
    requiredPolicies: FormControl<Array<string>>;
}

export interface LabelValue {
    label: string;
    value: string;
}

export interface AppFormState {
    processing: boolean;
    hasError: boolean;
    message: string;
}

export interface RiskProfileForm {
    name: FormControl<string>;
    description: FormControl<string>;
    activeStatus: FormControl<string>;
    attributeName: FormControl<string>;
    operator: FormControl<string>;
    attributeValue: FormControl<string>;
    requiredFacts: FormArray;
}

export type RequiredFactForm = Pick<RiskProfileForm, 'attributeName' | 'operator' | 'attributeValue'>;
