
# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# BROILERCARE
## Offline-First Android Expert System for Broiler Disease Diagnosis

Version: 1.0.0
Status: Development Specification
Platform: Android
Primary Language: Indonesian
Target User: Broiler Farmers
Development Approach: AI Agent Assisted Development

---

# 1. PROJECT OVERVIEW

## 1.1 Product Description

BroilerCare adalah aplikasi sistem pakar berbasis Android untuk membantu peternak ayam broiler mengidentifikasi kemungkinan penyakit berdasarkan gejala klinis yang ditemukan pada ayam.

Aplikasi menggunakan metode Certainty Factor (CF) untuk menghitung tingkat keyakinan terhadap kemungkinan penyakit berdasarkan:
- Gejala yang dipilih pengguna.
- Bobot kepercayaan dari pakar.
- Bobot ketidakpercayaan dari pakar.
- Tingkat keyakinan pengguna terhadap gejala.

Aplikasi dirancang dengan pendekatan Offline-First sehingga seluruh fitur utama dapat digunakan tanpa koneksi internet.

Tidak dibutuhkan backend, cloud database, maupun autentikasi online untuk MVP.

## 1.2 Research Foundation

Primary research reference:

Yoga Handoko Agustin, Asri Mulyani, Pendi Sopandi (2024).

"Implementasi Metode Certainty Faktor Pada Sistem Diagnosa Penyakit Ayam Pedaging (Broiler)"

Jurnal Algoritma, Vol. 21 No. 2, pages 332–342.

DOI:
https://doi.org/10.33364/algoritma/v.21-2.1526

Research methodology:
ADDIE:
1. Analysis
2. Design
3. Development
4. Implementation
5. Evaluation

Research evaluation:
- 10 test samples.
- 8 matching expert assessments.
- Reported accuracy: 80%.

IMPORTANT:
The research accuracy must not be presented as BroilerCare's accuracy.

All knowledge-base data must be traceable to the primary research or documented expert validation.

Do not fabricate expert weights, disease rules, or clinical facts.

## 1.3 Product Goals

1. Provide offline disease diagnosis.
2. Implement Certainty Factor correctly.
3. Provide an understandable diagnosis result.
4. Store diagnosis history locally.
5. Provide disease and symptom information.
6. Make the application lightweight.
7. Support low-end Android devices.
8. Make knowledge-base updates possible without rewriting application logic.

---

# 2. TARGET USERS

## Primary User: Broiler Farmer

Characteristics:
- Works in farms with limited internet connectivity.
- May use entry-level Android devices.
- Needs quick disease identification.
- Has limited technical knowledge.
- Understands symptoms better than medical terminology.

User needs:
- Simple interface.
- Easy symptom selection.
- Clear diagnosis results.
- Offline accessibility.
- Practical recommendations.

## Secondary User: Administrator / Knowledge Base Maintainer

Responsibilities:
- Maintain disease information.
- Maintain symptoms.
- Manage expert weights.
- Validate diagnostic rules.
- Prepare CSV knowledge-base updates.

MVP does not require a separate administrator application.

---

# 3. TECHNICAL STACK

Use the following stack.

## Core

- React Native
- Expo
- TypeScript
- Expo Router
- SQLite via expo-sqlite

## UI

- React Native
- NativeWind or StyleSheet
- Lucide React Native
- React Hook Form where necessary

## State Management

- Zustand

## Validation

- Zod

## Data Management

- CSV knowledge-base files
- SQLite local database
- Local JSON configuration where appropriate

## Testing

- Jest
- React Native Testing Library
- Expo-compatible test environment

## Build

- EAS Build
- Android APK

IMPORTANT:
Use Expo managed workflow.
Do not eject or introduce native modules without a clear requirement.

Do not introduce Rust, a backend, or unnecessary infrastructure in MVP.

---

# 4. ARCHITECTURE

Use modular architecture.

Suggested project structure:

broilercare/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── onboarding/
│   │   └── index.tsx
│   │
│   ├── home/
│   │   └── index.tsx
│   │
│   ├── diagnosis/
│   │   ├── index.tsx
│   │   ├── symptoms.tsx
│   │   ├── confidence.tsx
│   │   └── result.tsx
│   │
│   ├── diseases/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   │
│   ├── history/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   │
│   └── settings/
│       └── index.tsx
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── diagnosis/
│   │   ├── disease/
│   │   └── navigation/
│   │
│   ├── core/
│   │   └── certainty-factor/
│   │       ├── calculateCF.ts
│   │       ├── combineCF.ts
│   │       ├── normalizeCF.ts
│   │       └── types.ts
│   │
│   ├── database/
│   │   ├── client.ts
│   │   ├── migrations.ts
│   │   ├── schema.ts
│   │   ├── seed.ts
│   │   └── repositories/
│   │
│   ├── features/
│   │   ├── diagnosis/
│   │   ├── diseases/
│   │   ├── history/
│   │   └── settings/
│   │
│   ├── services/
│   │   ├── csvImporter.ts
│   │   ├── diagnosisService.ts
│   │   └── knowledgeBaseService.ts
│   │
│   ├── store/
│   │   └── diagnosisStore.ts
│   │
│   ├── hooks/
│   ├── constants/
│   ├── utils/
│   └── types/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── data/
│   ├── penyakit.csv
│   ├── gejala.csv
│   ├── aturan_diagnosis.csv
│   ├── contoh_bobot_cf_tetelo.csv
│   └── data_uji_10_sampel.csv
│
├── docs/
│   ├── RESEARCH.md
│   ├── DATA_DICTIONARY.md
│   ├── CF_ALGORITHM.md
│   └── VALIDATION.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── PRD.md
├── README.md
└── package.json

AI AGENT:
You may adjust this structure if necessary, but maintain separation between UI, business logic, database, and knowledge-base data.

---

# 5. OFFLINE-FIRST REQUIREMENTS

Offline capability is a mandatory requirement.

The application must work without internet access.

## 5.1 Features that must work offline

- Onboarding
- Dashboard
- Disease catalog
- Symptom catalog
- Diagnosis
- Certainty Factor calculation
- Diagnosis results
- Diagnosis history
- Disease information
- Settings
- Local data storage

## 5.2 Local Database

Use SQLite.

All knowledge-base records must be stored locally.

The initial database must be populated from bundled CSV files during first initialization.

The import process must:
1. Check database initialization status.
2. Create database tables.
3. Validate CSV structure.
4. Import valid records.
5. Check foreign-key integrity.
6. Save knowledge-base version.
7. Mark initialization complete.

Do not import duplicate records.

Do not overwrite existing diagnosis history during database updates.

Provide database migration support.

## 5.3 No Network Dependency

The diagnosis engine must never depend on:
- API calls.
- External AI services.
- Internet connectivity.
- Cloud database.
- External authentication.

All calculations happen locally.

---

# 6. KNOWLEDGE BASE DESIGN

The knowledge base is the foundation of the expert system.

Initial target:
- Approximately 8 diseases for a focused MVP.
- Approximately 30–40 symptoms.
- Disease-symptom diagnostic rules.

The previously prepared CSV contains a broader draft with 13 diseases, 40 symptoms, and 7 diagnostic rules.

The agent must audit that draft against the primary research before choosing the final production scope.

Do not silently discard or invent records to reach a target number.

## 6.1 Diseases CSV

File: penyakit.csv

Suggested columns:

id
kode_penyakit
nama_penyakit
deskripsi
penyebab
penanganan
pencegahan
tingkat_risiko
sumber_referensi

## 6.2 Symptoms CSV

File: gejala.csv

Suggested columns:

id
kode_gejala
nama_gejala
deskripsi
kategori
sumber_referensi

## 6.3 Diagnostic Rules CSV

File: aturan_diagnosis.csv

Suggested columns:

id
kode_penyakit
kode_gejala
mb
md
cf_pakar
sumber_bobot
status_validasi

MB = Measure of Belief

MD = Measure of Disbelief

CF pakar = MB - MD

All weights must be traceable to documented sources.

Do not fill missing weights with arbitrary values.

## 6.4 CF Example CSV

File: contoh_bobot_cf_tetelo.csv

This is a research/example reference only.

Do not automatically use it as production knowledge unless its provenance and validity are verified.

## 6.5 Testing Dataset

File: data_uji_10_sampel.csv

Purpose:
- Validate diagnosis calculations.
- Compare results against research test cases.
- Test edge cases.
- Verify application output.

Test samples are not production knowledge-base records.

## 6.6 Data Provenance

Every production diagnostic rule must include:
- Original source.
- Source page or table when available.
- Expert identity or documented validation reference.
- Validation status.
- Data version.

Use validation statuses:

DRAFT
SOURCE_VERIFIED
EXPERT_VALIDATED
APPROVED_FOR_PRODUCTION

Only approved records may be used for official diagnostic calculations.

If the research does not contain a particular weight, mark it as missing.

---

# 7. CERTAINTY FACTOR ENGINE

This is the most important business logic.

Implement Certainty Factor as a standalone TypeScript module.

Do not place CF calculations inside React components.

## 7.1 Basic Formula

CF(H,E) = MB(H,E) - MD(H,E)

Where:

H = Hypothesis (disease)

E = Evidence (symptom)

MB = Measure of Belief

MD = Measure of Disbelief

## 7.2 User Confidence

Users select symptoms and indicate their confidence.

Suggested user confidence scale:

| Answer | User CF |
|---|---:|
| Tidak tahu | 0.0 |
| Tidak yakin | 0.2 |
| Sedikit yakin | 0.4 |
| Cukup yakin | 0.6 |
| Yakin | 0.8 |
| Sangat yakin | 1.0 |

These are application interaction values, not veterinarian-derived weights.

## 7.3 Rule Calculation

For every selected symptom:

CF evidence = CF expert × CF user

Where:

CF expert = MB - MD

## 7.4 Combination Formula

For two positive CF values:

CFcombine = CF1 + CF2 × (1 - CF1)

For multiple evidence values, combine sequentially.

Negative and mixed-sign CF values must be handled according to the standard Certainty Factor combination rules.

Do not simply apply the positive formula to negative values.

Implement a dedicated combination function with explicit handling for:
- Positive + positive.
- Negative + negative.
- Positive + negative.
- Zero values.

## 7.5 Final Result

Calculate a final CF score for every eligible disease.

Convert the final score to percentage:

Confidence percentage = final CF × 100

Sort results by confidence in descending order.

Display:
- Most likely disease.
- Confidence percentage.
- Other possible diseases.
- Selected symptoms.
- Explanation of calculation.
- Recommended next action.

IMPORTANT:

A CF percentage is a system confidence score, not a clinically calibrated probability.

Do not claim that 90% CF means a 90% probability of actual disease.

## 7.6 Diagnosis Threshold

Do not invent a clinical threshold.

Make the display threshold configurable.

If the available knowledge base does not support a reliable diagnosis:
- Display insufficient evidence.
- Explain that the selected symptoms do not sufficiently match the available rules.
- Recommend examination by a veterinarian.

Never force a diagnosis when no eligible disease has sufficient evidence.

---

# 8. DATABASE SCHEMA

Use SQLite.

Required tables:

## diseases

- id
- code
- name
- description
- causes
- treatment
- prevention
- risk_level
- source_reference

## symptoms

- id
- code
- name
- description
- category
- source_reference

## diagnostic_rules

- id
- disease_id
- symptom_id
- mb
- md
- cf_expert
- source_reference
- validation_status

## diagnosis_history

- id
- diagnosis_date
- primary_disease_id
- confidence_score
- knowledge_base_version
- notes

## diagnosis_symptoms

- id
- diagnosis_id
- symptom_id
- user_confidence
- calculated_cf

## diagnosis_results

- id
- diagnosis_id
- disease_id
- cf_score
- rank

## app_metadata

- key
- value

Requirements:
- Enable SQLite foreign keys.
- Use indexes where appropriate.
- Use database transactions.
- Handle database errors gracefully.
- Use migrations for schema changes.

---

# 9. APPLICATION FEATURES

## 9.1 Onboarding

Purpose:
Introduce BroilerCare.

Screens:
1. Welcome.
2. Offline capability explanation.
3. How diagnosis works.
4. Disclaimer.
5. Start application.

Do not require account registration.

## 9.2 Dashboard

Main dashboard must include:

- Greeting.
- App identity.
- Offline status.
- Start diagnosis button.
- Disease catalog shortcut.
- Diagnosis history shortcut.
- Short usage instructions.

Primary CTA:
"Mulai Diagnosis"

## 9.3 Disease Catalog

Display all approved diseases.

Each disease item contains:
- Disease name.
- Short description.
- Risk level.
- Detail page.

Disease details:
- Description.
- Causes.
- Common symptoms.
- Prevention.
- General handling recommendations.
- References.

## 9.4 Symptom Selection

This is the primary diagnosis workflow.

Display symptoms grouped by category.

Possible categories:
- Respiratory.
- Digestive.
- Neurological.
- Physical appearance.
- Behavioral.
- General condition.

Categories must be based on actual symptom data.

Interaction:
- Select observed symptoms.
- Set confidence level for each symptom.
- Show selection progress.
- Allow deselection.
- Allow previous/next navigation.

Do not force users to select every symptom.

## 9.5 Diagnosis Processing

When the user confirms:

1. Retrieve selected symptoms.
2. Retrieve corresponding approved diagnostic rules.
3. Calculate CF for each disease.
4. Combine evidence.
5. Rank eligible diseases.
6. Save diagnosis history.
7. Display result.

All operations must run locally.

## 9.6 Diagnosis Result

Result screen must show:

Primary result:
- Disease name.
- Confidence score.
- Risk classification.
- Explanation.

Secondary results:
- Other possible diseases.
- Their respective CF scores.

Additional information:
- Symptoms contributing to the result.
- General prevention recommendations.
- Suggested next steps.

Provide:
- Save result.
- View disease details.
- Start new diagnosis.

Display a clear warning that this application is decision support, not a replacement for veterinary diagnosis.

## 9.7 Diagnosis History

Show previous diagnosis sessions.

Features:
- Date.
- Primary result.
- CF score.
- View details.
- Delete history.

History must remain available offline.

## 9.8 Settings

Features:
- Application information.
- Knowledge-base version.
- Data source information.
- Reset application data.
- About the research.
- Disclaimer.

---

# 10. UI/UX DESIGN SYSTEM

Design direction:

Modern, clean, minimal, professional.

Reference aesthetic:
- Notion.
- Linear.
- Modern healthcare applications.

Avoid:
- Excessive gradients.
- Excessive colors.
- Overcrowded dashboards.
- Too many decorative cards.
- Complicated navigation.

## 10.1 Color System

Suggested palette:

Primary: #237A57
Primary Dark: #18583E
Background: #F7F8F6
Surface: #FFFFFF
Text Primary: #202824
Text Secondary: #77827B
Border: #E5EAE6
Warning: #D99B35
Danger: #C94B4B

## 10.2 Typography

Use readable typography.

Recommended:
- Inter
- System font fallback

## 10.3 Navigation

Use bottom tab navigation:

1. Beranda
2. Penyakit
3. Riwayat
4. Pengaturan

Diagnosis is launched through the primary dashboard CTA.

## 10.4 Responsive Layout

Support different Android screen sizes.

Requirements:
- Small screens.
- Standard screens.
- Large screens.
- Different font scaling.
- Safe areas.
- Touch-friendly controls.

Minimum touch target: approximately 44–48 dp.

## 10.5 Accessibility

- Adequate contrast.
- Readable labels.
- Screen reader support.
- Clear selected states.
- Avoid relying exclusively on color.

---

# 11. PERFORMANCE REQUIREMENTS

Target devices:
Entry-level Android phones.

Requirements:
- Fast cold start.
- Lightweight bundle.
- No heavy animations.
- No unnecessary background services.
- Efficient SQLite queries.
- No large external dependencies.

Diagnosis calculations should execute locally without noticeable delay for the MVP knowledge base.

The application must remain functional in airplane mode.

---

# 12. SECURITY AND PRIVACY

MVP does not collect user accounts or personal data.

Requirements:
- Store diagnosis history locally.
- Do not transmit diagnosis data.
- No unnecessary permissions.
- No analytics SDK required.
- No external tracking.
- Protect against malformed CSV input.
- Validate imported records.

---

# 13. VALIDATION AND TESTING

Testing is mandatory.

## 13.1 Unit Testing

Test:
- MB - MD calculation.
- User confidence multiplication.
- Positive CF combination.
- Negative CF combination.
- Mixed-sign CF combination.
- Zero CF.
- Multiple symptom combination.
- Disease ranking.
- Missing diagnostic rules.

## 13.2 Integration Testing

Test:
- Database initialization.
- CSV import.
- Database queries.
- Diagnosis workflow.
- History persistence.
- Database migration.

## 13.3 UI Testing

Test:
- Onboarding.
- Dashboard navigation.
- Symptom selection.
- Confidence selection.
- Result display.
- History navigation.

## 13.4 Offline Testing

Mandatory scenario:

1. Install application.
2. Initialize database.
3. Enable airplane mode.
4. Open application.
5. Select symptoms.
6. Run diagnosis.
7. View result.
8. Save history.
9. Close application.
10. Reopen application.
11. Verify history persistence.

All steps must work without internet.

## 13.5 Research Validation

Compare implementation against the primary research.

Where the original research provides:
- Expert weights.
- Disease rules.
- Test samples.
- Manual calculations.

Use those values for reproducibility testing.

Do not manufacture missing test data.

Report:
- Number of valid test cases.
- Number of matching results.
- Discrepancies.
- Calculated accuracy where appropriate.

Conduct additional veterinarian validation before claiming production-level clinical reliability.

---

# 14. DEVELOPMENT PHASES

AI AGENT MUST FOLLOW THESE PHASES.

Do not implement everything in one uncontrolled step.

## PHASE 1 — Research and Data Audit

Tasks:
1. Inspect the primary research.
2. Extract available diseases.
3. Extract available symptoms.
4. Extract diagnostic rules.
5. Extract expert weights where available.
6. Inspect existing CSV files.
7. Identify missing data.
8. Document source provenance.
9. Separate verified and unverified records.

Deliverables:
- RESEARCH.md
- DATA_DICTIONARY.md
- VALIDATION.md
- Audited CSV files.

Acceptance:
No invented clinical data or CF weights.

## PHASE 2 — Project Initialization

Tasks:
1. Initialize Expo project.
2. Configure TypeScript.
3. Install Expo Router.
4. Install SQLite.
5. Configure Zustand.
6. Configure testing.
7. Configure folder structure.

Deliverables:
Runnable Android application.

Acceptance:
Application starts successfully.

## PHASE 3 — Database and Knowledge Base

Tasks:
1. Create SQLite schema.
2. Implement migrations.
3. Implement CSV parser.
4. Implement seed process.
5. Add data validation.
6. Add repository layer.
7. Add knowledge-base versioning.

Acceptance:
All approved knowledge-base data can be accessed offline.

## PHASE 4 — Certainty Factor Engine

Tasks:
1. Implement CF types.
2. Implement expert CF.
3. Implement user CF.
4. Implement evidence combination.
5. Implement disease ranking.
6. Implement insufficient-evidence handling.
7. Write unit tests.

Acceptance:
Results match manually calculated reference examples.

## PHASE 5 — UI Development

Tasks:
1. Onboarding.
2. Dashboard.
3. Disease catalog.
4. Disease details.
5. Symptom selection.
6. Confidence selection.
7. Diagnosis result.
8. History.
9. Settings.

Acceptance:
All screens functional and consistent.

## PHASE 6 — Integration

Tasks:
1. Connect UI with database.
2. Connect diagnosis workflow.
3. Implement history storage.
4. Implement error handling.
5. Test offline functionality.

Acceptance:
End-to-end diagnosis works without internet.

## PHASE 7 — Testing and Build

Tasks:
1. Run unit tests.
2. Run integration tests.
3. Test Android builds.
4. Test airplane mode.
5. Fix bugs.
6. Optimize performance.
7. Generate APK.

Deliverables:
- Production-ready MVP APK.
- README.md.
- Test report.
- Build instructions.

---

# 15. DEFINITION OF DONE

The MVP is complete when:

[ ] Android application builds successfully.

[ ] Application opens without internet.

[ ] SQLite initializes successfully.

[ ] Knowledge base is imported locally.

[ ] Disease catalog works offline.

[ ] Symptom selection works.

[ ] User confidence selection works.

[ ] Certainty Factor calculations are correct.

[ ] Disease ranking works.

[ ] Insufficient evidence is handled.

[ ] Diagnosis results are displayed.

[ ] Diagnosis history is saved.

[ ] History persists after restarting.

[ ] No mandatory API dependency exists.

[ ] Unit tests pass.

[ ] Offline tests pass.

[ ] Research provenance is documented.

[ ] No unverified expert weights are used in production.

[ ] APK is generated successfully.

---

# 16. AI AGENT WORKING RULES

You are the lead software engineer responsible for implementing BroilerCare.

Follow these instructions:

1. Read this PRD completely before coding.
2. Inspect the existing project before modifying files.
3. Inspect all available CSV datasets.
4. Never fabricate research findings.
5. Never invent veterinarian validation.
6. Never invent CF expert weights.
7. Keep business logic separate from UI.
8. Keep diagnosis calculations deterministic.
9. Write reusable TypeScript modules.
10. Write tests before considering core algorithms complete.
11. Keep the application offline-first.
12. Avoid unnecessary dependencies.
13. Prioritize performance on low-end Android devices.
14. Maintain clean and consistent UI.
15. Document important implementation decisions.
16. Do not skip development phases.
17. Do not claim features are complete without testing them.
18. Do not replace real knowledge-base data with mock data in production.

## Agent Execution Protocol

At the beginning of each phase:

- Inspect the current codebase.
- Identify existing implementation.
- Identify missing requirements.
- Create an implementation checklist.

During development:

- Implement small, testable components.
- Run relevant tests.
- Fix errors before moving forward.
- Update documentation.

At the end of each phase:

Provide a report containing:

1. Completed tasks.
2. Files created.
3. Files modified.
4. Tests executed.
5. Test results.
6. Known issues.
7. Remaining tasks.

Do not proceed to the next phase if critical requirements from the current phase are failing.

---

# 17. FIRST TASK FOR THE AI AGENT

Start with PHASE 1 ONLY.

Do not immediately build the UI.

First inspect:
- PRD.md
- Existing CSV datasets
- Primary research paper
- Existing project files

Then produce:

1. Research audit.
2. Knowledge-base data audit.
3. Disease inventory.
4. Symptom inventory.
5. Diagnostic rule inventory.
6. Missing expert-weight report.
7. Data provenance report.
8. Proposed SQLite schema.
9. Phase 1 completion report.

If the research does not provide sufficient data for a complete production knowledge base, clearly report what is missing.

Wait for approval before proceeding to Phase 2.

END OF PRD
