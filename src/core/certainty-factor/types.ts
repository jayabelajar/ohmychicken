export type ValidationStatus =
  | 'DRAFT'
  | 'SOURCE_VERIFIED'
  | 'EXPERT_VALIDATED'
  | 'APPROVED_FOR_PRODUCTION';

export interface Disease {
  id: string;
  code: string;
  name: string;
  latinName: string;
  description: string;
  causes: string;
  treatment: string;
  prevention: string;
  riskLevel: 'SEDANG' | 'TINGGI' | 'KRITIS';
  sourceReference: string;
}

export interface Symptom {
  id: string;
  code: string;
  name: string;
  category: 'Pernapasan' | 'Pencernaan' | 'Saraf & Perilaku' | 'Kepala & Fasial' | 'Fisik & Performa';
  description: string;
  sourceReference: string;
}

export interface DiagnosticRule {
  id: string;
  diseaseId: string;
  symptomId: string;
  mb: number;
  md: number;
  cfExpert: number;
  sourceReference: string;
  validationStatus: ValidationStatus;
}

export interface UserSymptomSelection {
  symptomId: string;
  userConfidence: number; // 0.0 - 1.0
}

export interface DiseaseDiagnosisResult {
  disease: Disease;
  percentage: number;
  cfScore: number;
  matchedRules: Array<{
    symptomId: string;
    cfUser: number;
    cfExpert: number;
    cfCalculated: number;
  }>;
  steps: string[];
}

