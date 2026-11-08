# AyamCare — Sistem Pakar Diagnosis Penyakit Ayam Broiler (Certainty Factor)

Aplikasi sistem pakar cerdas berbasis *Offline-First* untuk membantu peternak ayam broiler mendeteksi dan mengidentifikasi penyakit kawanan secara cepat dan terukur menggunakan metode **Certainty Factor (CF)**.

Aplikasi ini dikembangkan berdasarkan spesifikasi teknis `PRD.MD` dan berlandaskan penelitian primer:
> **Yoga Handoko Agustin, Asri Mulyani, Pendi Sopandi (2024)**  
> *"Implementasi Metode Certainty Faktor Pada Sistem Diagnosa Penyakit Ayam Pedaging (Broiler)"*  
> **Jurnal Algoritma**, Vol. 21 No. 2, Halaman 332–342.  
> DOI: [https://doi.org/10.33364/algoritma/v.21-2.1526](https://doi.org/10.33364/algoritma/v.21-2.1526)

---

## 🎨 Tampilan & Branding UI

Sesuai permintaan:
- **Branding:** `AyamCare` (menggantikan draft awal BroilerCare).
- **Nuansa Warna:** **Nuansa Biru (Medical & Veterinary Blue)**
  - Primary Brand: `#1E56A0` (Royal Navy Blue)
  - Brand Dark: `#163E75`
  - Brand Light: `#EFF6FF` / `#EBF3FC`
  - Accent: `#0284C7` (Sky Cyan)
  - Canvas: `#F4F7FB`
  - Ink: `#0F172A`
- **Fondasi UI:** Mengadopsi arsitektur responsif mobile container dari `UI.html` dengan peningkatan fitur:
  - 13 Penyakit Broiler Terdaftar (`P01` s.d. `P13`)
  - 40 Gejala Klinis Terkategori (`G01` s.d. `G40`) dalam 5 Kategori (Pernapasan, Pencernaan, Saraf & Perilaku, Kepala & Fasial, Fisik & Performa)
  - Panel Interaktif **"Uji 10 Sampel Jurnal" (Tabel 6)** untuk memverifikasi langsung akurasi diagnosis sistem terhadap data kasus historis.
  - Perhitungan matematis transparan: menampilkan rincian tahapan kombinasi $CF_{user} \times CF_{pakar}$ dan $CF_{combine}$.
  - Riwayat diagnosis offline tersimpan di *LocalStorage*.
  - Modal detail penyakit lengkap dengan etiologi patogen, pencegahan, dan pengobatan darurat.

---

## 📁 Struktur Berkas

```
ayamcare/
├── docs/
│   ├── PRD.MD                       # Product Requirements Document
│   ├── UI.html                      # Fondasi UI AyamCare nuansa biru
│   ├── RESEARCH.md                  # Audit penelitian & bukti ilmiah (Phase 1)
│   ├── DATA_DICTIONARY.md           # Kamus data, klasifikasi gejala, & skema SQLite (Phase 1)
│   ├── VALIDATION.md                # Matriks validasi 10 sampel uji & batasan klinis (Phase 1)
│   ├── CF_ALGORITHM.md              # Spesifikasi matematis algoritma Certainty Factor (Phase 1)
│   ├── README.txt                   # Catatan transkripsi dataset CSV
│   ├── penyakit.csv                 # Dataset 13 penyakit broiler dari artikel
│   ├── gejala.csv                   # Dataset 40 gejala klinis broiler dari artikel
│   ├── aturan_diagnosis.csv         # 7 Aturan diagnostik awal (Tabel 4 artikel)
│   ├── contoh_bobot_cf_tetelo.csv   # Bobot CF pakar Tetelo halaman 340
│   └── data_uji_10_sampel.csv       # Transkripsi 10 sampel pengujian Tabel 6
├── src/
│   ├── core/
│   │   └── certainty-factor/
│   │       ├── types.ts             # Tipe data TypeScript (Disease, Symptom, Rule, Result)
│   │       ├── combineCF.ts         # Formula kombinasi Shortliffe (pos, neg, mixed)
│   │       └── calculateCF.ts       # Mesin inferensi deterministik CF
│   └── database/
│       └── schema.ts                # DDL skema database SQLite (7 tabel relasional)
├── tests/
│   └── test_cf.js                   # Skrip pengujian mandiri reproduktifitas perhitungan CF
├── index.html                       # Antarmuka web mandiri AyamCare (offline-ready)
└── README.md                        # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan UI

Aplikasi bersifat **100% Offline-Ready** dan dapat langsung dibuka di browser apa saja tanpa perlu menjalankan server khusus:

1. Buka file [`index.html`](file:///d:/SKRIPSI/ayamcare/index.html) atau [`docs/UI.html`](file:///d:/SKRIPSI/ayamcare/docs/UI.html) menggunakan peramban modern (Google Chrome, Microsoft Edge, Safari, Firefox).
2. Anda juga dapat menjalankannya melalui server lokal jika diinginkan:
   ```bash
   npx serve .
   ```
3. Di dalam aplikasi:
   - Pilih menu **"Mulai Konsultasi Baru"** atau tombol **"Mulai Diagnosis Gejala Ayam"**.
   - Cari dan centang gejala yang diamati pada ayam di kandang (minimal 2 gejala).
   - Tentukan tingkat keyakinan Anda (Ragu-ragu, Cukup Yakin, Yakin, Sangat Yakin).
   - Klik **"Hitung Diagnosis CF"** untuk melihat penyakit terindikasi, persentase kepastian, diagnosa banding, dan rekomendasi penanganan.
   - Atau klik **"Buka Panel Uji 10 Sampel"** di beranda untuk menguji 10 kasus jurnal secara otomatis!

---

## 🧪 Verifikasi Matematis Algoritma

Untuk memverifikasi perhitungan Certainty Factor secara langsung dari terminal:
```bash
node tests/test_cf.js
```

Hasil verifikasi:
- Kasus Tetelo halaman 340: $CF = 0.8080$ ($80.8\%$) — **PERSIS SESUAI JURNAL**.
- Kasus CRD Sampel 1: $CF = 99.2\%$ — **SESUAI JURNAL**.

