# CERTAINTY FACTOR (CF) INFERENCE ENGINE SPECIFICATION
## AyamCare — Sistem Pakar Diagnosis Penyakit Ayam Broiler

**Versi Dokumen:** 1.0.0  
**Tanggal:** 8 November 2026  
**Status:** Algoritma Inferensi & Landasan Matematis Standar Shortliffe & Buchanan (1975)  

---

## 1. Definisi Teoretis Certainty Factor

Certainty Factor ($CF$) adalah metode penalaran berbasis ketidakpastian yang diperkenalkan oleh Shortliffe dan Buchanan dalam sistem pakar MYCIN (1975). Metode ini merepresentasikan derajat keyakinan pakar terhadap suatu hipotesis ($H$) berdasarkan bukti/gejala klinis ($E$).

$$CF(H, E) = MB(H, E) - MD(H, E)$$

Di mana:
- $H$ = Hipotesis / Diagnosis Penyakit
- $E$ = Evidence / Gejala Klinis yang teramati
- $MB(H, E)$ = *Measure of Increased Belief* ($0.0 \le MB \le 1.0$)
- $MD(H, E)$ = *Measure of Increased Disbelief* ($0.0 \le MD \le 1.0$)
- $CF(H, E)$ = Derajat Keyakinan Pakar ($-1.0 \le CF \le 1.0$)

---

## 2. Derajat Keyakinan Pengguna ($CF_{user}$)

Pada aplikasi **AyamCare**, peternak memilih tingkat keyakinan observasi terhadap gejala yang teramati di kandang:

| Skala Pilihan Peternak | Nilai $CF_{user}$ | Makna Observasi Klinis |
| :--- | :---: | :--- |
| **Tidak Yakin / Ragu-ragu** | `0.2` | Gejala samar atau hanya terlihat pada 1 ekor terisolasi |
| **Cukup Yakin** | `0.5` | Gejala mulai tampak pada beberapa ekor di satu sekat kandang |
| **Yakin** | `0.8` | Gejala jelas dan tampak pada kawanan secara meluas |
| **Sangat Yakin** | `1.0` | Gejala sangat mencolok, khas, dan terkonfirmasi nyata |

---

## 3. Perhitungan Gejala Tunggal (Single Evidence)

Untuk setiap gejala $E_i$ yang terbukti ada, skor keyakinan parsial dihitung:

$$CF(E_i) = CF_{pakar}(H, E_i) \times CF_{user}(E_i)$$

Contoh:
- $CF_{pakar} = 0.8$ (Bobot pakar untuk gejala tortikolis pada Tetelo)
- $CF_{user} = 0.8$ (Peternak yakin melihat gejala tersebut)
- Maka: $CF(E_i) = 0.8 \times 0.8 = 0.64$

---

## 4. Kombinasi Bukti Berantai (Sequential Combination)

Ketika beberapa gejala mendukung penyakit yang sama ($H$), nilai CF dikombinasikan secara sekuensial.

### 4.1 Jika Kedua Nilai Positif ($CF_1 > 0$ dan $CF_2 > 0$):
$$CF_{combine}(CF_1, CF_2) = CF_1 + CF_2 \times (1 - CF_1)$$

### 4.2 Jika Kedua Nilai Negatif ($CF_1 < 0$ dan $CF_2 < 0$):
$$CF_{combine}(CF_1, CF_2) = CF_1 + CF_2 \times (1 + CF_1)$$

### 4.3 Jika Berlawanan Tanda (Satu Positif dan Satu Negatif):
$$CF_{combine}(CF_1, CF_2) = \frac{CF_1 + CF_2}{1 - \min(|CF_1|, |CF_2|)}$$

---

## 5. Konversi Persentase & Pemeringkatan

Setelah semua gejala untuk penyakit dievaluasi, skor akhir dikonversi ke persentase keyakinan sistem:

$$\text{Persentase CF} = \text{round}(CF_{akhir} \times 100)\%$$

Sistem memeringkat seluruh penyakit berdasarkan $\text{Persentase CF}$ tertinggi secara *descending*.
- **Penyakit Utama (*Primary Match*):** Peringkat 1 dengan CF tertinggi.
- **Diferensial Diagnosis (*Secondary Matches*):** Peringkat 2 sampai 4 yang memiliki $CF > 0$.
- **Ambang Batas Tampilan (*Display Threshold*):** Minimal $20\%$ untuk diagnosis relevan. Jika di bawah $20\%$, sistem menyajikan peringatan "Bukti tidak cukup".

