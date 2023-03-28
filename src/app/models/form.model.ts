import { FormControl } from '@angular/forms';

export interface PolicyForm {
    name: FormControl<string>;
    description: FormControl<string>;
};

export interface LabelValue {
    label: string;
    value: string;
};