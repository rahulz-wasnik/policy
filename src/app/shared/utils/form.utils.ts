import { FormGroup } from "@angular/forms";

export function markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
        control.markAsTouched();
        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
}