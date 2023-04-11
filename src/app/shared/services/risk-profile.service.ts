import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, url } from '../../../environments/environment';
import { RiskProfiles } from '../models';

@Injectable({
    providedIn: 'root'
})
export class RiskProfileService {
    constructor(private http: HttpClient) {}

    getRiskProfiles(): Observable<RiskProfiles> {
        return this.http.get<RiskProfiles>(environment.api + url.RISK_PROFILE);
    }

    getRiskProfilesByReleaseType(id: string): Observable<RiskProfiles> {
        return this.http.get<RiskProfiles>(environment.api + url.RISK_PROFILE + '/' + id);
    }
}
