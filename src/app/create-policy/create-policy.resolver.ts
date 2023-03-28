import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError } from 'rxjs';
import { Injectable } from "@angular/core";

import { environment } from '../../environments/environment';

import { PolicyPhase } from "../models";

@Injectable()
export class CreatePolicyResolver implements Resolve<PolicyPhase | boolean> {
   
    constructor(private http: HttpClient, private router: Router) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PolicyPhase | boolean> {

        return this.http.get<PolicyPhase>(environment.api + "phases").pipe(
            catchError(err => this.router.navigate(["/error"]))
        );
    }

    
}