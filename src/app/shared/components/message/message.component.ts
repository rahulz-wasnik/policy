import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgAlertComponent } from '../../svgs/svg-alert.component';
import { SvgSuccessComponent } from '../../svgs/svg-success.component';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [CommonModule, SvgAlertComponent, SvgSuccessComponent],
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    @Input() hasError = false;
    @Input() message = '';
}
