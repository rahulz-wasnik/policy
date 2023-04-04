import { LabelValue } from "./form.model";

export interface Policy {
    name: string;
    description: string;
};

export type PolicyPhase = LabelValue[];

export type RiskProfiles = LabelValue[];

export type RequiredPolicies = LabelValue[];

export interface PolicyMatrix {
    applicationType: string;
    releaseType: string;
    riskProfile: string;
    requiredPolicies: Array<string>;
}

export interface PolicyMatrixResponse extends PolicyMatrix {
    id: string;
}