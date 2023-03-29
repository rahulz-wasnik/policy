import { Component } from '@angular/core';
import { routeConstants } from '../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  createPolicy = routeConstants.CREATEPOLICY; 
  viewModifyPolicy = routeConstants.VIEWMODIFYPOLICY;
  viewHistory = routeConstants.VIEWPOLICYHISTORY;
}
