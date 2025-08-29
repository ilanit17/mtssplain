import { School } from ".";

export interface SchoolReportCard {
    school: School;
    schoolName: string;
    principalName: string;
    studentCount: number;
    supportLevel: string;
    overallAverage: number;
    mtssTier: number;
    riskLevel: string;
    domainAverages: { [key: string]: number };
    strengths: string[];
    challenges: string[];
    recommendations: string[];
}

export interface SchoolAssessmentData {
    id: number;
    schoolName: string;
    principalName: string;
    overallAverage: number;
    mtssTier: number;
    riskLevel: string;
}