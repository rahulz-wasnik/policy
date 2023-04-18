import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { routeConstants } from './shared/constants';

const routes: Routes = [
    {
        path: routeConstants.POLICY,
        loadChildren: () => import('./modules/policy/policy.module').then((m) => m.PolicyModule)
    },
    {
        path: routeConstants.POLICY_MATRIX,
        loadChildren: () => import('./modules/policy-matrix/policy-matrix.module').then((m) => m.PolicyMatrixModule)
    },
    {
        path: routeConstants.RISK_PROFILE,
        loadChildren: () => import('./modules/risk-profile/risk-profile.module').then((m) => m.RiskProfileModule)
    },
    {
        path: 'error',
        component: ErrorPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
