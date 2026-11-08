import { combineTwoCF } from './combineCF';
import { Disease, DiagnosticRule, UserSymptomSelection, DiseaseDiagnosisResult } from './types';

/**
 * Menghitung CF single evidence:
 * CF(H, E) = CF_pakar * CF_user
 */
export function calculateSingleEvidenceCF(cfExpert: number, cfUser: number): number {
  return Number((cfExpert * cfUser).toFixed(4));
}

/**
 * Mesin inferensi diagnosis Certainty Factor deterministik
 */
export function diagnoseDiseases(
  diseases: Disease[],
  rules: DiagnosticRule[],
  selections: UserSymptomSelection[]
): DiseaseDiagnosisResult[] {
  const selectionMap = new Map<string, number>();
  selections.forEach(s => selectionMap.set(s.symptomId, s.userConfidence));

  const results: DiseaseDiagnosisResult[] = [];

  for (const disease of diseases) {
    const diseaseRules = rules.filter(r => r.diseaseId === disease.id || r.diseaseId === disease.code);
    const matchedRules: DiseaseDiagnosisResult['matchedRules'] = [];
    const steps: string[] = [];

    for (const rule of diseaseRules) {
      if (selectionMap.has(rule.symptomId)) {
        const cfUser = selectionMap.get(rule.symptomId)!;
        const cfCalculated = calculateSingleEvidenceCF(rule.cfExpert, cfUser);

        matchedRules.push({
          symptomId: rule.symptomId,
          cfUser,
          cfExpert: rule.cfExpert,
          cfCalculated
        });
      }
    }

    if (matchedRules.length > 0) {
      let combinedCF = matchedRules[0].cfCalculated;
      steps.push(`CF1 [${matchedRules[0].symptomId}]: ${matchedRules[0].cfCalculated.toFixed(3)}`);

      for (let i = 1; i < matchedRules.length; i++) {
        const prevCF = combinedCF;
        const nextCF = matchedRules[i].cfCalculated;
        combinedCF = combineTwoCF(prevCF, nextCF);
        steps.push(`+ CF${i + 1} [${matchedRules[i].symptomId}]: ${prevCF.toFixed(3)} + ${nextCF.toFixed(3)}*(1-${prevCF.toFixed(3)}) = ${combinedCF.toFixed(3)}`);
      }

      const percentage = Math.min(100, Math.max(0, Math.round(combinedCF * 100)));

      results.push({
        disease,
        percentage,
        cfScore: combinedCF,
        matchedRules,
        steps
      });
    }
  }

  // Sort descending by highest cfScore
  results.sort((a, b) => b.cfScore - a.cfScore);

  return results;
}

