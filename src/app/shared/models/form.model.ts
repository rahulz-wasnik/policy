import { FormControl } from '@angular/forms';

export interface PolicyForm {
    phase: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string>;
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
    processing: boolean,
    hasError: boolean,
    message: string
}
