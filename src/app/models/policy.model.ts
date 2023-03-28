import { FormControl } from '@angular/forms';

export interface Policy {
    name: FormControl<string>;
    description: FormControl<string>;
}
