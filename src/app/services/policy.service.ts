import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Policy } from "../models";

@Injectable({
    providedIn: "root"
})
export class PolicyService {

    constructor(private http: HttpClient) {}

    createPolicy(policy: Policy): void {
        this.http.post(environment.api + "create", JSON.stringify(policy), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}