import { FormControl, FormGroup } from "@angular/forms";

type ControlTypes = FormControl | FormGroup<any>;

export function markFormGroupTouched(formGroup: FormGroup<any>): void {
    (Object as any).values(formGroup.controls).forEach((control: ControlTypes) => {
        control.markAsTouched();
        if ((control as FormGroup<any>).controls) {
            markFormGroupTouched(control as FormGroup<any>);
        }
    });
}