import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../svg/alert/alert.component';
import { SuccessComponent } from '../../svg/success/success.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, AlertComponent, SuccessComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() hasError: boolean = false;
  @Input() message: string = '';
}
