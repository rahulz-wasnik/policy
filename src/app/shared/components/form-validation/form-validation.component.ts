import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SvgAlertComponent } from '../../svgs/svg-alert.component';

@Component({
  standalone: true,
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
  imports: [ CommonModule, SvgAlertComponent ]
})
export class FormValidationComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() appControl!: FormControl<any>; 
  @Input() errorMessage!: string;
}
