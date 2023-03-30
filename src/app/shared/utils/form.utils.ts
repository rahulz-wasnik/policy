import { FormControl, FormGroup } from "@angular/forms";
import { FormGroupTypes } from "../models";

type ControlTypes = FormControl | FormGroup<FormGroupTypes>;

export function markFormGroupTouched(formGroup: FormGroup<FormGroupTypes>): void {
    Object.values(formGroup.controls).forEach((control: ControlTypes) => {
        control.markAsTouched();
        if ((control as FormGroup<FormGroupTypes>).controls) {
            markFormGroupTouched(control as FormGroup<FormGroupTypes>);
        }
    });
}