import { Component } from '@angular/core';
import { routeConstants } from 'src/app/shared/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  createPolicy = routeConstants.CREATE_POLICY;
  createPolicyMatrix = routeConstants.POLICY_MATRIX + "/" + routeConstants.CREATE;
  viewModifyPolicyMatrix = routeConstants.POLICY_MATRIX + "/" + routeConstants.VIEW_MODIFY;
}
