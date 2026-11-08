# RESEARCH AUDIT & SCIENTIFIC FOUNDATION
## AyamCare — Sistem Pakar Diagnosis Penyakit Ayam Broiler (Certainty Factor)

**Versi Dokumen:** 1.0.0  
**Tanggal:** 8 November 2026  
**Status:** Phase 1 Deliverable — Audit Lengkap Sumber Primer & Basis Pengetahuan  

---

## 1. Rujukan Penelitian Primer

Penelitian yang menjadi rujukan utama sistem pakar **AyamCare** adalah:

- **Judul Artikel:** *Implementasi Metode Certainty Faktor Pada Sistem Diagnosa Penyakit Ayam Pedaging (Broiler)*
- **Penulis:** Yoga Handoko Agustin, Asri Mulyani, Pendi Sopandi
- **Publikasi:** *Jurnal Algoritma*, Vol. 21, No. 2, Halaman 332–342 (2024)
- **Penerbit:** Institut Teknologi Garut (ITG)
- **ISSN / E-ISSN:** 2302-7339 / 2300-0209
- **DOI:** [https://doi.org/10.33364/algoritma/v.21-2.1526](https://doi.org/10.33364/algoritma/v.21-2.1526)
- **Metodologi Pengembangan Penelitian:** ADDIE (*Analysis, Design, Development, Implementation, Evaluation*)

---

## 2. Inventarisasi Data Hasil Ekstraksi Jurnal

### 2.1 Daftar Penyakit (Tabel 2 Jurnal)
Tabel 2 memuat **13 entitas penyakit** ayam broiler:

| Kode | Nama Penyakit (Artikel) | Nama Latin / Ilmiah (Artikel) | Patogen Utama | Tingkat Risiko |
| :--- | :--- | :--- | :--- | :--- |
| **P01** | Berak kapur | *Pullorum Disease* (*Salmonella pullorum*) | Bakteri | Tinggi |
| **P02** | Kolera Ayam | *Fowl Cholera* (*Pasteurella multocida*) | Bakteri | Sangat Tinggi |
| **P03** | Flu Burung | *Avian Influenza* (*HPAI H5N1*) | Virus | Kritis / Zoonosis |
| **P04** | Tetelo | *Newcastle Disease* (*APMV-1*) | Virus | Kritis |
| **P05** | Tipus Ayam | *Fowl Typhoid* (*Salmonella gallinarum*) | Bakteri | Tinggi |
| **P06** | Berak Darah | *Coccidiosis* (*Eimeria tenella / necatrix*) | Protozoa | Sedang - Tinggi |
| **P07** | Gumboro | *Gumboro Disease* / IBDV | Virus | Tinggi |
| **P08** | Salesma ayam | *Infectious Coryza* (*Avibacterium paragallinarum*) | Bakteri | Sedang |
| **P09** | Batuk Ayam Menahun | *Infectious Bronchitis* (IBV) | Virus | Sedang - Tinggi |
| **P10** | Busung Ayam | *Lymphoid Leukosis* (ALV) | Virus | Sedang |
| **P11** | Batuk Darah | *Infectious Laryngotracheitis* (ILTV) | Virus | Tinggi |
| **P12** | Mareks | *Marek's Disease* (MDV / Gallid alphaherpesvirus 2) | Virus | Tinggi |
| **P13** | CRD | *Chronic Respiratory Disease* (*Mycoplasma gallisepticum*) | Bakteri / Mikoplasma | Sedang |

---

### 2.2 Daftar Gejala (Tabel 3 Jurnal)
Tabel 3 memuat **40 gejala klinis** terdaftar (G01–G40).  
Berdasarkan audit ketat tim data, ditemukan beberapa **duplikasi label** dan inkonsistensi penomoran yang dicetak dalam artikel asli:

| Kode | Label Gejala di Artikel | Temuan Audit & Analisis | Kategori Klinis |
| :--- | :--- | :--- | :--- |
| **G01** | Nafsu makan berkurang | Valid, gejala umum | Fisik & Performa |
| **G02** | Nafas sesak | Valid, respiratori | Pernapasan |
| **G03** | Nafas ngorok basah | Valid, rales respiratori | Pernapasan |
| **G04** | Bersin-bersin | Valid, respiratori | Pernapasan |
| **G05** | Batuk | Valid, respiratori | Pernapasan |
| **G06** | Bulu kusam | Identik dengan G13 di Tabel 3 | Fisik & Performa |
| **G07** | Keluar cairan dari hidung | Identik dengan G23 di Tabel 3 | Pernapasan |
| **G08** | Fase bintik-bintik kuning | Dugaan salt-white/yellowish cecal core | Pencernaan |
| **G09** | Muka pucat | Valid, indikasi anemia | Kepala & Fasial |
| **G10** | Kepala bengkak | Valid, *swollen head syndrome* | Kepala & Fasial |
| **G11** | Kepala berputar | Valid, tortikolis syaraf | Saraf & Perilaku |
| **G12** | Muka bengkak | Valid, edema fasial | Kepala & Fasial |
| **G13** | Bulu kusam | Duplikat dari G06 | Fisik & Performa |
| **G14** | Peradangan dubur | Valid, vent inflammation | Pencernaan |
| **G15** | Kejang-kejang | Valid, manifestasi tremor saraf | Saraf & Perilaku |
| **G16** | Kotoran kuning kehijauan | Valid, feses patologis | Pencernaan |
| **G17** | Lumpuh | Valid, kelumpuhan unilateral/bilateral | Saraf & Perilaku |
| **G18** | Mencret putih | Valid, diare putih kapur (*Pullorum*) | Pencernaan |
| **G19** | Paruh ditaruh dasar | Valid, leher lunglai akibat depresi akut | Saraf & Perilaku |
| **G20** | Kaki bengkak | Valid, hock joint synovitis | Fisik & Lokomotor |
| **G21** | Sinus pada mata | Valid, konjungtivitis / pembengkakan sinus | Kepala & Fasial |
| **G22** | Mati mendadak | Valid, mortalitas perakut | Umum / Kritis |
| **G23** | Keluar cairan dari hidung | Duplikat dari G07 | Pernapasan |
| **G24** | Sayap menggantung | Valid, kelemahan lokomotor | Fisik & Lokomotor |
| **G25** | Kaki pincang | Duplikat dengan G36 | Fisik & Lokomotor |
| **G26** | Badan kurus | Valid, kaheksia / atrofi otot | Fisik & Performa |
| **G27** | Jengger pucat | Valid, sianosis / pucat | Kepala & Fasial |
| **G28** | Pembengkakan pial | Valid, wattle edema | Kepala & Fasial |
| **G29** | Pembengkakan daerah fasial dan sekitar mata | Duplikat dengan G37 | Kepala & Fasial |
| **G30** | Bergerombol di sudut kandang | Valid, indikasi kedinginan / demam | Saraf & Perilaku |
| **G31** | Batuk berdarah | Duplikat dengan G34 | Pernapasan |
| **G32** | Kelihatan mengantuk dengan bulu berdiri | Valid, depresi somnolen | Fisik & Perilaku |
| **G33** | Mematuk daerah kloak | Valid, kloasitis / pruritus vent | Saraf & Perilaku |
| **G34** | Batuk berdarah | Duplikat dengan G31 | Pernapasan |
| **G35** | Terdapat lendir bercampur darah rongga mulut | Valid, hemoragik trakeal | Pernapasan |
| **G36** | Kaki pincang | Duplikat dengan G25 | Fisik & Lokomotor |
| **G37** | Pembengkakan daerah fasial dan sekitar mata | Duplikat dengan G29 | Kepala & Fasial |
| **G38** | Kotoran berdarah | Valid, melena / hematokezia (*Coccidiosis*) | Pencernaan |
| **G39** | Perut membesar | Valid, asites / hepatosplenomegali | Fisik & Abdomen |
| **G40** | Nampak membiru | Valid, sianosis perifer | Kepala & Kulit |

---

### 2.3 Aturan Diagnosis (Tabel 4 Jurnal)
Tabel 4 hanya memuat **7 aturan diagnostik** untuk 7 penyakit:

1. **R01 (P01 - Berak kapur):**  
   `IF G01 (Nafsu makan berkurang) AND G18 (Mencret keputihan) AND G24 (Sayap menggantung) AND Kotoran putih menempel di sekitar anus THEN P01 [CF Aturan = 0.52]`
2. **R02 (P02 - Kolera Ayam):**  
   `IF G01 (Nafsu makan berkurang) AND G02 (Sesak nafas) AND G21/G29 (Pembengkakan dari sinus dan mata) THEN P02 [CF Aturan = 0.64]`
3. **R03 (P04 - Tetelo):**  
   `IF G01 (Nafsu makan berkurang) AND G07 (Keluar cairan hidung) AND G02 (Sesak nafas) AND G11 (Kepala berputar) AND G17 (Lumpuh) AND G32 (Tampak lesu) THEN P04 [CF Aturan = 0.40]`
4. **R04 (P07 - Gumboro):**  
   `IF G01 (Nafsu makan berkurang) AND G14 (Peradangan dubur) AND G18 (Mencret keputihan) AND G19 (Paruh ditaruh di bawah) THEN P07 [CF Aturan = 0.64]`
5. **R05 (P13 - CRD):**  
   `IF G03 (Nafas ngorok basah) AND G07 (Keluar cairan hidung) AND G08 (Fase bintik-bintik kuning) AND G09/G27 (Pucat) THEN P13 [CF Aturan = 0.51]`
6. **R06 (P05 - Tipus Ayam):**  
   `IF G01 (Nafsu makan berkurang) AND G27 (Jengger pucat) AND G06 (Bulu kusam) AND G16 (Kotoran kuning kehijauan) THEN P05 [CF Aturan = 0.51]`
7. **R07 (P11 - Batuk Darah):**  
   `IF G02 (Nafas sesak) AND Julurkan leher AND G31 (Batuk berdarah) AND G35 (Lendir berdarah rongga mulut) THEN P11 [CF Aturan = 0.64]`

---

### 2.4 Bobot CF Pakar Per Gejala (Halaman 340 Jurnal)
Pada bagian perhitungan manual contoh Tetelo (P04), jurnal menyajikan tiga bobot pakar spesifik:
- `P04` + `G01` (Nafsu makan berkurang): $CF_{pakar} = 0.2$
- `P04` + `G17` (Lumpuh): $CF_{pakar} = 0.6$
- `P04` + `G20/G11` (Kepala berputar): $CF_{pakar} = 0.4$

---

### 2.5 Data Pengujian 10 Sampel (Tabel 6 Jurnal)
Penelitian menguji 10 sampel kasus broiler di peternakan:

| Sampel | Gejala Teramati | Hasil Sistem (CF) | Diagnosis Dokter Hewan | Kesesuaian |
| :---: | :--- | :--- | :--- | :---: |
| 1 | Nafas ngorok, Keluar cairan hidung, Feses bintik kuning, Pucat, Sesak nafas | CRD (100%) | CRD | **Sesuai** |
| 2 | Cairan mata & hidung, Kotoran kuning hijau, Batuk darah, Bulu kusam | Salesma Ayam (80%) | Salesma Ayam | **Sesuai** |
| 3 | Nafsu makan turun, Cairan hidung, Lemas, Sesak nafas, Kepala berputar | Gumboro (54%) | Gumboro | **Sesuai** |
| 4 | Perut membesar, Bulu kusam | Tipus Ayam (36%) | Tipus Ayam | **Sesuai** |
| 5 | Nafsu makan turun, Cairan hidung, Lemas, Sesak nafas, Muka bengkak | Tetelo (48%) | Tetelo | **Sesuai** |
| 6 | Kotoran putih di anus, Kotoran berdarah | Berak Darah (80%) | Berak Darah | **Sesuai** |
| 7 | Kepala bengkak, Mati mendadak | Flu Burung (60%) | Berak Kapur | *Tidak Sesuai* |
| 8 | Mencret keputihan, Paruh ditaruh dasar, Lemas, Bulu kusam | Busung Ayam (64%) | Gumboro | *Tidak Sesuai* |
| 9 | Kotoran putih di anus, Nafas sesak | Berak Kapur (36%) | Berak Kapur | **Sesuai** |
| 10 | Bersin, Mati mendadak, Lendir mulut, Tidur paruh di lantai | Batuk Darah (60%) | Batuk Darah | **Sesuai** |

**Akurasi Penelitian:**  
$$\text{Akurasi} = \frac{8}{10} \times 100\% = 80\%$$

---

## 3. Laporan Kesenjangan Data & Integritas Pengetahuan (Missing Data Audit)

Sesuai instruksi PRD Bab 1 & 6:
> *"Semua data basis pengetahuan harus dapat ditelusuri ke riset primer atau validasi pakar berdokumen. Jangan membuat bobot pakar, aturan penyakit, atau fakta klinis tiruan."*

Temuan penting yang dilaporkan:
1. **Aturan Tak Tercetak Lengkap:** Dari 13 penyakit, hanya 7 aturan yang dicetak pada Tabel 4. Penyakit P03 (Flu Burung), P06 (Berak Darah), P08 (Salesma Ayam), P09, P10 (Busung Ayam), dan P12 (Mareks) tidak memiliki baris aturan eksplisit di Tabel 4, namun dipanggil pada Tabel 6 (data uji sampel 2, 6, 7, 8).
2. **Ketiadaan Tabel MB & MD Lengkap:** Jurnal tidak melampirkan matriks lengkap MB (*Measure of Belief*) dan MD (*Measure of Disbelief*) untuk seluruh 40 gejala terhadap 13 penyakit.
3. **Dua Mode Representasi CF pada Jurnal:**
   - **Mode A (Rule CF):** Satu nilai CF dicantumkan untuk satu kombinasi aturan (Tabel 4: 0.52, 0.64, 0.40, dll).
   - **Mode B (Evidence CF Combinatorial):** Setiap gejala memiliki $CF_{pakar} = MB - MD$, dikalikan $CF_{user}$, kemudian dikombinasikan secara berulang dengan formula Shortliffe (halaman 340).

**Keputusan Arsitektur AyamCare:**
- AyamCare mengimplementasikan mesin inferensi Certainty Factor deterministik penuh berbasis kombinasi bukti (Mode B) yang kompatibel dengan bobot pakar dan aturan relasi artikel.
- Gejala dan aturan yang terverifikasi primer diberi status `SOURCE_VERIFIED`.
- Aturan inferensi pelengkap dari Tabel 6 diberi status `SOURCE_DERIVED_TABLE_6` dengan penanda jelas agar transparan bagi dokter hewan evaluator.

