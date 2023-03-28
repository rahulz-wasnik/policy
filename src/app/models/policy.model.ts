import { FormControl } from '@angular/forms';
import { LabelValue } from './app.model';

export interface Policy {
    name: FormControl<string>;
    description: FormControl<string>;
};

export type PolicyPhase = LabelValue;