import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Policy } from '../models/policy.model';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {

  addPolicyForm: FormGroup<Policy> = new FormGroup<Policy>({
    name: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });


  onSubmit(): void {
    
  }
}
