import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { Policy, PolicyMatrix } from "../models";

@Injectable({
    providedIn: "root"
})
export class PolicyService {

    constructor(private http: HttpClient) {}

    createPolicy(policy: Policy): Observable<boolean> {
        return of(true).pipe(delay(1000));
        // TODO: Add the backend logic to submit the policy
        // return this.http.post<Policy>(environment.api + "create", JSON.stringify(policy), {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
    }

    createPolicyMatrix(policyMatrix: PolicyMatrix): Observable<PolicyMatrix> {
        return this.http.post<PolicyMatrix>(environment.api + "createPolicyMatrix", JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}