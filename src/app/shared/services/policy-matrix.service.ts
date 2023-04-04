import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { environment, URL } from "../../../environments/environment";
import { PolicyMatrix, PolicyMatrixResponse } from "../models";

@Injectable({
    providedIn: "root"
})
export class PolicyMatrixService {

    policyMatrixResponse$ = new ReplaySubject<PolicyMatrixResponse | null>(1);

    constructor(private http: HttpClient) {}

    createPolicyMatrix(policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.post<string>(environment.api + URL.POLICY_MATRIX, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    getPolicyMatrix(id: string): Observable<PolicyMatrixResponse> {
        return this.http.get<PolicyMatrixResponse>(environment.api + URL.POLICY_MATRIX + "/" + id);
    }

    // TODO: To be refactored
    deletePolicyMatrix(id: string): Observable<string> {
        return this.http.delete<string>(environment.api + URL.POLICY_MATRIX + "/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    updatePolicyMatrix(id: string, policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.put<string>(environment.api + URL.POLICY_MATRIX + "/" + id, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }
}