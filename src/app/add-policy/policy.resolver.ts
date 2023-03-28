import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { LabelValue } from "../models/app.model";
import { environment } from '../../environments/environment';

import { Observable, catchError } from 'rxjs';

export class AddPolicyResolver implements Resolve<LabelValue | boolean> {
   
    constructor(private http: HttpClient, private router: Router) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LabelValue | boolean> {

        return this.http.get<LabelValue>(environment.api).pipe(
            catchError(err => this.router.navigate([""]))
        );
    }

    
}