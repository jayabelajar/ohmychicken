/**
 * Mengkombinasikan dua nilai Certainty Factor (CF) sesuai standar Shortliffe & Buchanan (1975)
 *
 * 1. Jika CF1 > 0 dan CF2 > 0:
 *    CF_comb = CF1 + CF2 * (1 - CF1)
 *
 * 2. Jika CF1 < 0 dan CF2 < 0:
 *    CF_comb = CF1 + CF2 * (1 + CF1)
 *
 * 3. Jika berlawanan tanda (satu positif dan satu negatif):
 *    CF_comb = (CF1 + CF2) / (1 - min(|CF1|, |CF2|))
 */
export function combineTwoCF(cf1: number, cf2: number): number {
  if (cf1 === 0) return cf2;
  if (cf2 === 0) return cf1;

  if (cf1 > 0 && cf2 > 0) {
    return cf1 + cf2 * (1 - cf1);
  }

  if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  }

  // Mixed signs
  const minAbs = Math.min(Math.abs(cf1), Math.abs(cf2));
  if (minAbs === 1) {
    return 0; // Boundary condition to avoid division by zero
  }
  return (cf1 + cf2) / (1 - minAbs);
}

/**
 * Mengkombinasikan deretan nilai CF sekuensial
 */
export function combineSequentialCF(cfList: number[]): number {
  if (!cfList || cfList.length === 0) return 0;
  if (cfList.length === 1) return cfList[0];

  let combined = cfList[0];
  for (let i = 1; i < cfList.length; i++) {
    combined = combineTwoCF(combined, cfList[i]);
  }

  return combined;
}

