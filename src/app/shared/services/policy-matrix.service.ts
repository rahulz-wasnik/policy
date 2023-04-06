import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment, url } from '../../../environments/environment';
import { PolicyMatrix, PolicyMatrixResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class PolicyMatrixService {
    policyMatrixResponse$ = new ReplaySubject<PolicyMatrixResponse | null>(1);

    constructor(private http: HttpClient) {}

    getPolicyMatrices(): Observable<PolicyMatrixResponse[]> {
        return this.http.get<PolicyMatrixResponse[]>(environment.api + url.POLICY_MATRIX);
    }

    createPolicyMatrix(policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.post<string>(environment.api + url.POLICY_MATRIX, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    getPolicyMatrix(id: number): Observable<PolicyMatrixResponse> {
        return this.http.get<PolicyMatrixResponse>(environment.api + url.POLICY_MATRIX + '/' + id);
    }

    // TODO: To be refactored
    deletePolicyMatrix(id: number): Observable<string> {
        return this.http.delete<string>(environment.api + url.POLICY_MATRIX + '/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    updatePolicyMatrix(id: number, policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.put<string>(environment.api + url.POLICY_MATRIX + '/' + id, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }
}
