import { Disease, Symptom, DiagnosticRule } from '../core/certainty-factor/types';

export const DISEASES: Disease[] = [
  {
    id: 'P01',
    code: 'P01',
    name: 'Berak Kapur (Pullorum)',
    latinName: 'Salmonella pullorum',
    riskLevel: 'TINGGI',
    description: 'Penyakit bakterial menular pada ayam broiler terutama anak ayam (DOC). Menyebabkan peradangan usus akut dengan feses putih berkapur yang menempel di sekitar kloaka.',
    causes: 'Bakteri Salmonella pullorum non-motil, menular vertikal dari induk atau horizontal via pakan/air tercemar.',
    prevention: 'Pastikan DOC berasal dari pembibit bebas Salmonella, sanitasi brooder dengan desinfektan aldehid, dan jaga suhu kandang tetap hangat.',
    treatment: 'Pemberian antibiotik sulfonamida (seperti sulfadiazine-trimethoprim) atau amoksisilin melalui air minum selama 5 hari berturut-turut.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P02',
    code: 'P02',
    name: 'Kolera Ayam (Fowl Cholera)',
    latinName: 'Pasteurella multocida',
    riskLevel: 'KRITIS',
    description: 'Penyakit infeksi bakterial sistemik akut yang menyebabkan septikemia dengan mortalitas tinggi. Gejala khas meliputi sesak napas dan pembengkakan pial/sinus.',
    causes: 'Bakteri Pasteurella multocida yang berkembang biak saat ayam mengalami stres cuaca ekstrem atau kepadatan tinggi.',
    prevention: 'Biosekuriti ketat, pencegahan akses burung liar dan hewan pengerat ke kandang, serta vaksinasi bakterin kolera.',
    treatment: 'Injeksi antibiotik berspektrum luas (oxytetracycline) pada ayam sakit dan medikasi chlortetracycline via air minum untuk kawanan.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P03',
    code: 'P03',
    name: 'Flu Burung (Avian Influenza)',
    latinName: 'Highly Pathogenic Avian Influenza (H5N1)',
    riskLevel: 'KRITIS',
    description: 'Penyakit viral akut zoonosis berbahaya yang menyerang sistem saraf, respirasi, dan kardiovaskular dengan angka kematian mendadak mencapai 100%.',
    causes: 'Virus Influenza tipe A subtipe H5/H7 famili Orthomyxoviridae.',
    prevention: 'Vaksinasi AI berkala, pagar biosekuriti 3 zona (bersih, kotor, penyangga), dan larangan tegas memasukkan unggas liar.',
    treatment: 'TIDAK BOLEH DIOBATI. Wajib lapor ke Dinas Peternakan / Pusat Kesehatan Hewan segera untuk isolasi dan stamping-out bersyarat.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P04',
    code: 'P04',
    name: 'Tetelo (Newcastle Disease / ND)',
    latinName: 'Avian Paramyxovirus type 1 (APMV-1)',
    riskLevel: 'KRITIS',
    description: 'Penyakit virus ganas yang menyebabkan gangguan syaraf pusat (kepala terputar/tortikolis), pernapasan berbunyi, diare kehijauan, dan kelumpuhan kaki/sayap.',
    causes: 'Virus Paramyxovirus tipe 1 galur velogenik viseral maupun neurotropik.',
    prevention: 'Vaksinasi terprogram: ND Hitchner B1 tetes mata umur 4 hari, disusul ND LaSota via air minum umur 18-21 hari.',
    treatment: 'Tidak ada obat antivirus spesifik. Pisahkan ayam yang terinfeksi, berikan terapi suportif multivitamin dosis tinggi dan immunostimulan.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P05',
    code: 'P05',
    name: 'Tipus Ayam (Fowl Typhoid)',
    latinName: 'Salmonella gallinarum',
    riskLevel: 'TINGGI',
    description: 'Infeksi bakteri septikemik yang ditandai kotoran kuning kehijauan, anemia (jengger pucat), bulu kusam, dan pembesaran perut akibat hepatomegali.',
    causes: 'Bakteri Salmonella gallinarum yang menginfeksi saluran empedu dan hati.',
    prevention: 'Klorinasi tandon air minum peternakan, rotasi desinfektan alas kandang, dan isolasi kandang dari lalat/kutu.',
    treatment: 'Pemberian antibiotik enrofloxacin atau florfenicol sesuai dosis tertera dokter hewan selama 5 hari berturut.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P06',
    code: 'P06',
    name: 'Berak Darah (Koksidiosis)',
    latinName: 'Eimeria tenella / Eimeria necatrix',
    riskLevel: 'SEDANG',
    description: 'Penyakit parasit protozoa yang merusak sel epitel usus halus dan sekum ayam broiler akibat kondisi sekam (litter) basah dan berbau amonia.',
    causes: 'Ookista parasit protozoa Eimeria yang tertelan dari sekam atau air minum yang tercemar.',
    prevention: 'Jaga kelembapan litter di bawah 25%, balik sekam secara teratur, cegah nipple air minum bocor, dan gunakan antikoksidia feed additive.',
    treatment: 'Pengobatan dengan Toltrazuril 2.5% atau Sulfaquinoxaline melalui air minum selama 2-3 hari berturut.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P07',
    code: 'P07',
    name: 'Gumboro (Infectious Bursal Disease)',
    latinName: 'Infectious Bursal Disease Virus (IBDV)',
    riskLevel: 'TINGGI',
    description: 'Penyakit viral akut yang menyerang bursa fabricius ayam muda umur 3-6 minggu. Menyebabkan imunosupresi parah, diare putih, dan ayam mematuk kloaka.',
    causes: 'Birnavirus sangat stabil terhadap lingkungan dan bahan kimia desinfektan umum.',
    prevention: 'Vaksinasi Gumboro strain intermediate/intermediate plus pada umur 10-14 hari sesuai titer antibodi maternal.',
    treatment: 'Terapi suportif: larutan gula merah 2-3% ditambah vitamin ginjal dan elektrolit untuk menekan kematian akibat gagal ginjal.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P08',
    code: 'P08',
    name: 'Salesma Ayam (Coryza)',
    latinName: 'Avibacterium paragallinarum',
    riskLevel: 'SEDANG',
    description: 'Penyakit pernapasan akut yang ditandai keluarnya lendir kental berbau busuk dari mata dan hidung, pembengkakan sinus muka, dan mata berbusa.',
    causes: 'Bakteri Avibacterium paragallinarum yang menyebar cepat melalui droplet udara kandang.',
    prevention: 'Pengaturan ventilasi udara kandang yang baik, sistem all-in all-out, dan istirahat kandang minimal 14 hari.',
    treatment: 'Antibiotik eritromisin, spiramisin, atau kombinasi sulfametoksazol-trimetoprim via air minum.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P09',
    code: 'P09',
    name: 'Batuk Ayam Menahun (Infectious Bronchitis)',
    latinName: 'Avian Infectious Bronchitis Virus (IBV)',
    riskLevel: 'SEDANG',
    description: 'Penyakit pernapasan menular yang menyerang trakea dan saluran bronkus ayam broiler, menyebabkan batuk, ngorok, dan kerusakan ginjal.',
    causes: 'Gammacoronavirus avian yang sangat menular melalui aerosol udara pernapasan.',
    prevention: 'Vaksinasi kombinasi ND-IB aktif pada umur dini di hatchery atau umur 4 hari di kandang.',
    treatment: 'Tidak ada obat kuratif untuk virus. Berikan ekspektoran bromhexine dan vitamin ADE untuk memulihkan silia epitel pernapasan.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P10',
    code: 'P10',
    name: 'Busung Ayam (Lymphoid Leukosis)',
    latinName: 'Avian Leukosis Virus (ALV)',
    riskLevel: 'SEDANG',
    description: 'Penyakit neoplastik kronis yang menyebabkan timbulnya tumor pada organ dalam dan penimbunan cairan di rongga perut (asites / busung).',
    causes: 'Retrovirus onkogenik yang ditularkan secara vertikal dari induk ayam pembibit.',
    prevention: 'Seleksi bibit DOC dari strain bebas leukosis, culling selektif ayam yang menunjukkan pembesaran abdomen.',
    treatment: 'Tidak ada pengobatan efektif. Lakukan afkir dini pada unggas yang sakit agar tidak menghabiskan pakan.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P11',
    code: 'P11',
    name: 'Batuk Darah (Laryngotracheitis / ILT)',
    latinName: 'Gallid alphaherpesvirus 1 (ILTV)',
    riskLevel: 'TINGGI',
    description: 'Infeksi pernapasan akut yang ditandai ayam menjulurkan leher tersengal-sengal untuk bernapas, batuk mengeluarkan bekuan darah, dan eksudat hemoragik di mulut.',
    causes: 'Virus Herpesvirus tipe 1 yang bereplikasi di membran mukosa trakea dan laring.',
    prevention: 'Vaksinasi ILT dengan tetes mata pada daerah endemis, hindari percampuran unggas beda umur.',
    treatment: 'Pemberian mukolitik untuk mencairkan sumbatan lendir trakea dan antibiotik sekunder untuk mencegah infeksi bakteri sekunder.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P12',
    code: 'P12',
    name: 'Mareks (Marek\'s Disease)',
    latinName: 'Marek\'s Disease Virus (MDV)',
    riskLevel: 'TINGGI',
    description: 'Penyakit limfoproliferatif menular pada ayam yang menyerang saraf perifer, menyebabkan salah satu kaki menjulur ke depan dan satu ke belakang (kelumpuhan asimetris).',
    causes: 'Gallid alphaherpesvirus 2 yang menyebar melalui debu folikel bulu ayam.',
    prevention: 'Vaksinasi wajib pada umur 1 hari (DOC) di ruang penetasan (hatchery) sebelum ayam didistribusikan.',
    treatment: 'Tidak ada pengobatan kuratif. Isolasi dan musnahkan ayam yang lumpuh permanen.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  },
  {
    id: 'P13',
    code: 'P13',
    name: 'CRD (Chronic Respiratory Disease)',
    latinName: 'Mycoplasma gallisepticum',
    riskLevel: 'SEDANG',
    description: 'Penyakit ngorok kronis menahun pada ayam pedaging yang sangat sering terjadi akibat kadar amonia tinggi dan perubahan suhu drastis.',
    causes: 'Bakteri Mycoplasma gallisepticum tanpa dinding sel, mudah berkomplikasi dengan E. coli.',
    prevention: 'Kontrol ventilasi udara tirai kandang, pastikan amonia kandang < 15 ppm, dan berikan desinfeksi udara berkala.',
    treatment: 'Pemberian antibiotik makrolida (Tylosin, Tilmicosin) atau doksisiklin melalui air minum selama 4-5 hari.',
    sourceReference: 'Agustin, Mulyani & Sopandi (2024), Jurnal Algoritma 21(2), 332-342'
  }
];

export const SYMPTOMS: Symptom[] = [
  // Pernapasan
  { id: 'G02', code: 'G02', name: 'Nafas sesak / mengap-mengap', category: 'Pernapasan', description: 'Ayam membuka paruh dan kesulitan mengambil udara', sourceReference: 'Tabel 3' },
  { id: 'G03', code: 'G03', name: 'Nafas ngorok basah (rales)', category: 'Pernapasan', description: 'Terdengar suara dengkuran berlendir saat malam hari', sourceReference: 'Tabel 3' },
  { id: 'G04', code: 'G04', name: 'Bersin-bersin', category: 'Pernapasan', description: 'Ayam menggelengkan kepala sambil mengeluarkan suara bersin', sourceReference: 'Tabel 3' },
  { id: 'G05', code: 'G05', name: 'Batuk', category: 'Pernapasan', description: 'Suara letupan batuk kering atau berlendir di kawanan', sourceReference: 'Tabel 3' },
  { id: 'G07', code: 'G07', name: 'Keluar cairan / lendir dari hidung', category: 'Pernapasan', description: 'Eksudat bening atau kental menyumbat lubang hidung', sourceReference: 'Tabel 3' },
  { id: 'G31', code: 'G31', name: 'Batuk berdarah (hemoptisis)', category: 'Pernapasan', description: 'Bercak darah segar terbatuk ke dinding atau lantai kandang', sourceReference: 'Tabel 3' },
  { id: 'G35', code: 'G35', name: 'Lendir bercampur darah di rongga mulut', category: 'Pernapasan', description: 'Gumpalan bekuan darah merah kehitaman di dalam paruh', sourceReference: 'Tabel 3' },

  // Pencernaan
  { id: 'G08', code: 'G08', name: 'Feses terdapat bintik-bintik kuning', category: 'Pencernaan', description: 'Kotoran encer dengan sebaran nodul kuning seperti keju', sourceReference: 'Tabel 3' },
  { id: 'G14', code: 'G14', name: 'Peradangan dubur / anus kemerahan', category: 'Pencernaan', description: 'Kulit sekitar kloaka membengkak dan kotoran menempel', sourceReference: 'Tabel 3' },
  { id: 'G16', code: 'G16', name: 'Kotoran kuning kehijauan', category: 'Pencernaan', description: 'Feses cair berlendir dengan warna kuning asam empedu', sourceReference: 'Tabel 3' },
  { id: 'G18', code: 'G18', name: 'Mencret putih seperti pasta kapur', category: 'Pencernaan', description: 'Diare putih pekat mengering di bulu sekitar pantat', sourceReference: 'Tabel 3' },
  { id: 'G33', code: 'G33', name: 'Mematuk daerah kloaka sendiri', category: 'Pencernaan', description: 'Ayam sering mematuki duburnya akibat rasa panas/iritasi', sourceReference: 'Tabel 3' },
  { id: 'G38', code: 'G38', name: 'Kotoran bercampur darah (merah)', category: 'Pencernaan', description: 'Feses encer kemerahan khas perdarahan usus sekum', sourceReference: 'Tabel 3' },

  // Saraf & Perilaku
  { id: 'G11', code: 'G11', name: 'Kepala berputar (tortikolis)', category: 'Saraf & Perilaku', description: 'Leher terpelintir ke samping atau ditekuk ke bawah perut', sourceReference: 'Tabel 3' },
  { id: 'G15', code: 'G15', name: 'Kejang-kejang / tremor tubuh', category: 'Saraf & Perilaku', description: 'Otot tubuh gemetar spasmodik mendadak saat disentuh', sourceReference: 'Tabel 3' },
  { id: 'G17', code: 'G17', name: 'Lumpuh kaki atau sayap', category: 'Saraf & Perilaku', description: 'Tidak mampu berdiri dan menyeret sayap atau kakinya', sourceReference: 'Tabel 3' },
  { id: 'G19', code: 'G19', name: 'Paruh ditaruh di dasar lantai', category: 'Saraf & Perilaku', description: 'Posisi leher lunglai rebah ke sekam akibat lemas parah', sourceReference: 'Tabel 3' },
  { id: 'G30', code: 'G30', name: 'Bergerombol di sudut kandang', category: 'Saraf & Perilaku', description: 'Ayam menumpuk mencari kehangatan akibat demam/kedinginan', sourceReference: 'Tabel 3' },

  // Kepala & Fasial
  { id: 'G09', code: 'G09', name: 'Muka pucat', category: 'Kepala & Fasial', description: 'Kulit wajah tampak kusam keputihan akibat anemia', sourceReference: 'Tabel 3' },
  { id: 'G10', code: 'G10', name: 'Kepala bengkak (swollen head)', category: 'Kepala & Fasial', description: 'Seluruh batok kepala membesar akibat edema subkutan', sourceReference: 'Tabel 3' },
  { id: 'G12', code: 'G12', name: 'Muka bengkak', category: 'Kepala & Fasial', description: 'Pipi membengkak menonjol di salah satu atau kedua sisi', sourceReference: 'Tabel 3' },
  { id: 'G21', code: 'G21', name: 'Sinus pada mata bengkak / berbusa', category: 'Kepala & Fasial', description: 'Kelopak mata tertutup lendir berbusa dan berair', sourceReference: 'Tabel 3' },
  { id: 'G27', code: 'G27', name: 'Jengger pucat kebiruan', category: 'Kepala & Fasial', description: 'Warna jengger kehilangan rona merah normalnya', sourceReference: 'Tabel 3' },
  { id: 'G28', code: 'G28', name: 'Pembengkakan pial (gelambir)', category: 'Kepala & Fasial', description: 'Pial di bawah dagu menebal panas dan mengeras', sourceReference: 'Tabel 3' },
  { id: 'G29', code: 'G29', name: 'Pembengkakan fasial & sekitar mata', category: 'Kepala & Fasial', description: 'Jaringan lunak wajah menonjol seperti mata burung hantu', sourceReference: 'Tabel 3' },
  { id: 'G40', code: 'G40', name: 'Jengger / kulit nampak membiru', category: 'Kepala & Fasial', description: 'Sianosis parah pertanda hipoksia peredaran darah', sourceReference: 'Tabel 3' },

  // Fisik & Performa
  { id: 'G01', code: 'G01', name: 'Nafsu makan & minum berkurang', category: 'Fisik & Performa', description: 'Konsumsi pakan menurun >20% dari standar harian strain', sourceReference: 'Tabel 3' },
  { id: 'G06', code: 'G06', name: 'Bulu kusam & berdiri (mekar)', category: 'Fisik & Performa', description: 'Bulu tidak mengilap, kotor berantakan dan menggigil', sourceReference: 'Tabel 3' },
  { id: 'G20', code: 'G20', name: 'Sendi kaki bengkak', category: 'Fisik & Performa', description: 'Sendi hock membesar kemerahan dan panas disentuh', sourceReference: 'Tabel 3' },
  { id: 'G22', code: 'G22', name: 'Kematian mendadak dalam jumlah banyak', category: 'Fisik & Performa', description: 'Mortalitas perakut tanpa tanda sakit kronis terlebih dahulu', sourceReference: 'Tabel 3' },
  { id: 'G24', code: 'G24', name: 'Sayap menggantung lunglai', category: 'Fisik & Performa', description: 'Sayap menyentuh lantai sekam karena kelemahan motorik', sourceReference: 'Tabel 3' },
  { id: 'G25', code: 'G25', name: 'Kaki pincang saat berjalan', category: 'Fisik & Performa', description: 'Jalan tertatih-tatih atau bertumpu pada satu kaki', sourceReference: 'Tabel 3' },
  { id: 'G26', code: 'G26', name: 'Badan kurus (atrofi tulang dada)', category: 'Fisik & Performa', description: 'Tulang dada terasa menonjol tajam dan bobot turun', sourceReference: 'Tabel 3' },
  { id: 'G32', code: 'G32', name: 'Kelihatan mengantuk & mata terpejam', category: 'Fisik & Performa', description: 'Ayam berdiam diri membisu di tepi tanpa merespons pakan', sourceReference: 'Tabel 3' },
  { id: 'G39', code: 'G39', name: 'Perut membesar kembung (asites)', category: 'Fisik & Performa', description: 'Abdomen bagian bawah menggantung terisi cairan transudat', sourceReference: 'Tabel 3' }
];

export const DIAGNOSTIC_RULES: DiagnosticRule[] = [
  // P01: Berak Kapur
  { id: 'R01-1', diseaseId: 'P01', symptomId: 'G01', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R01-2', diseaseId: 'P01', symptomId: 'G18', mb: 0.9, md: 0.0, cfExpert: 0.9, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R01-3', diseaseId: 'P01', symptomId: 'G24', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R01-4', diseaseId: 'P01', symptomId: 'G14', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R01-5', diseaseId: 'P01', symptomId: 'G02', mb: 0.5, md: 0.0, cfExpert: 0.5, sourceReference: 'Tabel 6 Sampel 9', validationStatus: 'SOURCE_VERIFIED' },

  // P02: Kolera Ayam
  { id: 'R02-1', diseaseId: 'P02', symptomId: 'G01', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R02-2', diseaseId: 'P02', symptomId: 'G02', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R02-3', diseaseId: 'P02', symptomId: 'G21', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R02-4', diseaseId: 'P02', symptomId: 'G28', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R02-5', diseaseId: 'P02', symptomId: 'G29', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },

  // P03: Flu Burung
  { id: 'R03-1', diseaseId: 'P03', symptomId: 'G10', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 6 Sampel 7', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R03-2', diseaseId: 'P03', symptomId: 'G22', mb: 0.95, md: 0.0, cfExpert: 0.95, sourceReference: 'Tabel 6 Sampel 7', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R03-3', diseaseId: 'P03', symptomId: 'G40', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 2 & 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R03-4', diseaseId: 'P03', symptomId: 'G02', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P04: Tetelo
  { id: 'R04-1', diseaseId: 'P04', symptomId: 'G01', mb: 0.2, md: 0.0, cfExpert: 0.2, sourceReference: 'Contoh Tetelo Hal 340', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R04-2', diseaseId: 'P04', symptomId: 'G17', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Contoh Tetelo Hal 340', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R04-3', diseaseId: 'P04', symptomId: 'G11', mb: 0.4, md: 0.0, cfExpert: 0.4, sourceReference: 'Contoh Tetelo Hal 340', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R04-4', diseaseId: 'P04', symptomId: 'G07', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R04-5', diseaseId: 'P04', symptomId: 'G02', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R04-6', diseaseId: 'P04', symptomId: 'G32', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },

  // P05: Tipus Ayam
  { id: 'R05-1', diseaseId: 'P05', symptomId: 'G01', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R05-2', diseaseId: 'P05', symptomId: 'G27', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R05-3', diseaseId: 'P05', symptomId: 'G06', mb: 0.65, md: 0.0, cfExpert: 0.65, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R05-4', diseaseId: 'P05', symptomId: 'G16', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R05-5', diseaseId: 'P05', symptomId: 'G39', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 6 Sampel 4', validationStatus: 'SOURCE_VERIFIED' },

  // P06: Berak Darah
  { id: 'R06-1', diseaseId: 'P06', symptomId: 'G38', mb: 0.95, md: 0.0, cfExpert: 0.95, sourceReference: 'Tabel 6 Sampel 6', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R06-2', diseaseId: 'P06', symptomId: 'G14', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 6 Sampel 6', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R06-3', diseaseId: 'P06', symptomId: 'G06', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R06-4', diseaseId: 'P06', symptomId: 'G27', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P07: Gumboro
  { id: 'R07-1', diseaseId: 'P07', symptomId: 'G01', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R07-2', diseaseId: 'P07', symptomId: 'G14', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R07-3', diseaseId: 'P07', symptomId: 'G18', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R07-4', diseaseId: 'P07', symptomId: 'G19', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R07-5', diseaseId: 'P07', symptomId: 'G33', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P08: Salesma Ayam
  { id: 'R08-1', diseaseId: 'P08', symptomId: 'G07', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 6 Sampel 2', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R08-2', diseaseId: 'P08', symptomId: 'G16', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 6 Sampel 2', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R08-3', diseaseId: 'P08', symptomId: 'G31', mb: 0.65, md: 0.0, cfExpert: 0.65, sourceReference: 'Tabel 6 Sampel 2', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R08-4', diseaseId: 'P08', symptomId: 'G06', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 6 Sampel 2', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R08-5', diseaseId: 'P08', symptomId: 'G29', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P09: Batuk Ayam Menahun
  { id: 'R09-1', diseaseId: 'P09', symptomId: 'G03', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R09-2', diseaseId: 'P09', symptomId: 'G05', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R09-3', diseaseId: 'P09', symptomId: 'G04', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R09-4', diseaseId: 'P09', symptomId: 'G02', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P10: Busung Ayam
  { id: 'R10-1', diseaseId: 'P10', symptomId: 'G18', mb: 0.7, md: 0.0, cfExpert: 0.7, sourceReference: 'Tabel 6 Sampel 8', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R10-2', diseaseId: 'P10', symptomId: 'G19', mb: 0.65, md: 0.0, cfExpert: 0.65, sourceReference: 'Tabel 6 Sampel 8', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R10-3', diseaseId: 'P10', symptomId: 'G06', mb: 0.6, md: 0.0, cfExpert: 0.6, sourceReference: 'Tabel 6 Sampel 8', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R10-4', diseaseId: 'P10', symptomId: 'G39', mb: 0.9, md: 0.0, cfExpert: 0.9, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P11: Batuk Darah
  { id: 'R11-1', diseaseId: 'P11', symptomId: 'G02', mb: 0.85, md: 0.0, cfExpert: 0.85, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R11-2', diseaseId: 'P11', symptomId: 'G31', mb: 0.9, md: 0.0, cfExpert: 0.9, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R11-3', diseaseId: 'P11', symptomId: 'G35', mb: 0.95, md: 0.0, cfExpert: 0.95, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R11-4', diseaseId: 'P11', symptomId: 'G01', mb: 0.5, md: 0.0, cfExpert: 0.5, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },

  // P12: Mareks
  { id: 'R12-1', diseaseId: 'P12', symptomId: 'G17', mb: 0.9, md: 0.0, cfExpert: 0.9, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R12-2', diseaseId: 'P12', symptomId: 'G24', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R12-3', diseaseId: 'P12', symptomId: 'G25', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 3', validationStatus: 'SOURCE_VERIFIED' },

  // P13: CRD
  { id: 'R13-1', diseaseId: 'P13', symptomId: 'G03', mb: 0.9, md: 0.0, cfExpert: 0.9, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R13-2', diseaseId: 'P13', symptomId: 'G07', mb: 0.8, md: 0.0, cfExpert: 0.8, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R13-3', diseaseId: 'P13', symptomId: 'G08', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R13-4', diseaseId: 'P13', symptomId: 'G09', mb: 0.65, md: 0.0, cfExpert: 0.65, sourceReference: 'Tabel 4', validationStatus: 'SOURCE_VERIFIED' },
  { id: 'R13-5', diseaseId: 'P13', symptomId: 'G02', mb: 0.75, md: 0.0, cfExpert: 0.75, sourceReference: 'Tabel 6 Sampel 1', validationStatus: 'SOURCE_VERIFIED' }
];

export const RESEARCH_SAMPLES = [
  { id: 1, name: 'Sampel 1 (CRD)', symptoms: ['G03', 'G07', 'G08', 'G09', 'G02'], expectedDisease: 'CRD', expectedCF: '100%', match: 'Sesuai' },
  { id: 2, name: 'Sampel 2 (Salesma Ayam)', symptoms: ['G07', 'G16', 'G31', 'G06'], expectedDisease: 'Salesma Ayam', expectedCF: '80%', match: 'Sesuai' },
  { id: 3, name: 'Sampel 3 (Gumboro)', symptoms: ['G01', 'G07', 'G32', 'G02', 'G11'], expectedDisease: 'Gumboro / Tetelo', expectedCF: '54%', match: 'Sesuai' },
  { id: 4, name: 'Sampel 4 (Tipus Ayam)', symptoms: ['G39', 'G06'], expectedDisease: 'Tipus Ayam', expectedCF: '36%', match: 'Sesuai' },
  { id: 5, name: 'Sampel 5 (Tetelo)', symptoms: ['G01', 'G07', 'G32', 'G02', 'G12'], expectedDisease: 'Tetelo', expectedCF: '48%', match: 'Sesuai' },
  { id: 6, name: 'Sampel 6 (Berak Darah)', symptoms: ['G14', 'G38'], expectedDisease: 'Berak Darah', expectedCF: '80%', match: 'Sesuai' },
  { id: 7, name: 'Sampel 7 (Flu Burung)', symptoms: ['G10', 'G22'], expectedDisease: 'Flu Burung', expectedCF: '60%', match: 'Diskrepansi (Pakar: Berak Kapur)' },
  { id: 8, name: 'Sampel 8 (Busung Ayam)', symptoms: ['G18', 'G19', 'G32', 'G06'], expectedDisease: 'Busung Ayam / Gumboro', expectedCF: '64%', match: 'Diskrepansi (Pakar: Gumboro)' },
  { id: 9, name: 'Sampel 9 (Berak Kapur)', symptoms: ['G14', 'G02'], expectedDisease: 'Berak Kapur', expectedCF: '36%', match: 'Sesuai' },
  { id: 10, name: 'Sampel 10 (Batuk Darah)', symptoms: ['G04', 'G22', 'G35', 'G19'], expectedDisease: 'Batuk Darah', expectedCF: '60%', match: 'Sesuai' }
];

export const CF_USER_SCALES = [
  { label: 'Ragu-ragu', value: 0.2 },
  { label: 'Cukup Yakin', value: 0.5 },
  { label: 'Yakin', value: 0.8 },
  { label: 'Sangat Yakin', value: 1.0 }
];

