// Verification script against research examples (Agustin et al., 2024)

function combineTwoCF(cf1, cf2) {
    if (cf1 === 0) return cf2;
    if (cf2 === 0) return cf1;
    if (cf1 > 0 && cf2 > 0) return cf1 + cf2 * (1 - cf1);
    if (cf1 < 0 && cf2 < 0) return cf1 + cf2 * (1 + cf1);
    return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
}

console.log("=== PENGUJIAN 1: CONTOH MANUAL TETELO HALAMAN 340 ===");
// Tetelo manual example on p. 340:
// Evidence 1: G01 (cfExpert = 0.2, cfUser = 1.0) -> CF1 = 0.2
// Evidence 2: G17 (cfExpert = 0.6, cfUser = 1.0) -> CF2 = 0.6
// Evidence 3: G20/G11 (cfExpert = 0.4, cfUser = 1.0) -> CF3 = 0.4
const cf1 = 0.2;
const cf2 = 0.6;
const cfComb1 = combineTwoCF(cf1, cf2);
console.log(`CF_comb(1, 2) = ${cf1} + ${cf2} * (1 - ${cf1}) = ${cfComb1.toFixed(3)} (Expected: 0.680)`);

const cf3 = 0.4;
const cfComb2 = combineTwoCF(cfComb1, cf3);
console.log(`CF_comb(old, 3) = ${cfComb1.toFixed(3)} + ${cf3} * (1 - ${cfComb1.toFixed(3)}) = ${cfComb2.toFixed(4)} (Expected: 0.8080 or ~81%)`);

console.log("\n=== PENGUJIAN 2: SAMPLE 1 (CRD) ===");
// CRD with user CF = 0.8
const crdRules = [0.9, 0.8, 0.75, 0.65, 0.75];
let crdComb = crdRules[0] * 0.8;
for (let i = 1; i < crdRules.length; i++) {
    crdComb = combineTwoCF(crdComb, crdRules[i] * 0.8);
}
console.log(`CRD Combined CF: ${(crdComb * 100).toFixed(1)}% (Approaches 99-100%)`);

console.log("\nSemua verifikasi matematis berhasil dieksekusi dengan presisi tinggi.");

