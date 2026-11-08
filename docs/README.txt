PAKET CSV BROILERCARE — TRANSKRIP TERBATAS DARI JURNAL 2024

Sumber utama:
Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342
DOI: https://doi.org/10.33364/algoritma/v.21-2.1526
PDF: https://jurnal.itg.ac.id/index.php/algoritma/article/download/1526/1283/11243

ISI:
1. penyakit.csv
   Daftar 13 penyakit dari Tabel 2 artikel.

2. gejala.csv
   Daftar 40 kode gejala dari Tabel 3 artikel. Kode dan label dipertahankan seperti terbit,
   termasuk label yang berulang/serupa. Jangan menganggap kode duplikat sudah dinormalisasi.

3. aturan_diagnosis.csv
   Tujuh aturan yang tercetak pada Tabel 4. CF yang dicantumkan artikel (misalnya 0.52)
   disimpan sebagai cf_aturan_artikel. Nilai tersebut bukan MB atau MD per gejala.
   Beberapa kondisi pada aturan tidak memiliki padanan persis di Tabel 3; kondisi asli
   dipertahankan di kolom kondisi_gejala_raw agar tidak mengarang pemetaan kode.

4. contoh_bobot_cf_tetelo.csv
   Tiga bobot CF pakar per gejala yang ditampilkan pada contoh perhitungan Tetelo di halaman 340.
   Ini hanya contoh, bukan bobot lengkap semua penyakit/gejala.

5. data_uji_10_sampel.csv
   Transkripsi ringkas Tabel 6. Ini adalah 10 sampel pengujian dalam penelitian, bukan
   dataset mentah lengkap atau data pelatihan yang bisa diasumsikan representatif.

PENTING:
- Artikel menyebut pengumpulan pengetahuan melalui wawancara dengan dokter hewan dan peternak
  ayam pedaging (bagian 3.1), tetapi identitas/kualifikasi pakar dan lembar elisitasi lengkap
  tidak disediakan secara rinci dalam tabel artikel.
- Jangan mengisi MB/MD atau bobot per gejala yang tidak dipublikasikan dengan angka buatan.
- Sebelum dipakai untuk diagnosis, normalisasi istilah, pemetaan gejala, aturan, nama penyakit,
  dan bobot harus diperiksa dokter hewan.
- Hasil CF bukan probabilitas klinis dan aplikasi bukan pengganti dokter hewan.
- Encoding: UTF-8 with BOM; delimiter: comma.
