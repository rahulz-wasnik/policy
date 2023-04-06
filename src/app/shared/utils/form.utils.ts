import { FormControl, FormGroup } from "@angular/forms";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ControlTypes = FormControl | FormGroup<any>;

export function markFormGroupTouched(formGroup: FormGroup<any>): void {
    (Object as any).values(formGroup.controls).forEach((control: ControlTypes) => {
        control.markAsTouched();
        if ((control as FormGroup<any>).controls) {
            markFormGroupTouched(control as FormGroup<any>);
        }
    });
}
/* eslint-disable @typescript-eslint/no-explicit-any */