export const SQLITE_SCHEMA = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS diseases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    latin_name TEXT NOT NULL,
    description TEXT NOT NULL,
    causes TEXT NOT NULL,
    treatment TEXT NOT NULL,
    prevention TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    source_reference TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    source_reference TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS diagnostic_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_id INTEGER NOT NULL,
    symptom_id INTEGER NOT NULL,
    mb REAL NOT NULL DEFAULT 0.0,
    md REAL NOT NULL DEFAULT 0.0,
    cf_expert REAL NOT NULL,
    source_reference TEXT NOT NULL,
    validation_status TEXT NOT NULL,
    FOREIGN KEY (disease_id) REFERENCES diseases (id) ON DELETE CASCADE,
    FOREIGN KEY (symptom_id) REFERENCES symptoms (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diagnosis_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    diagnosis_uuid TEXT UNIQUE NOT NULL,
    diagnosis_date TEXT NOT NULL,
    primary_disease_id INTEGER NOT NULL,
    confidence_score REAL NOT NULL,
    knowledge_base_version TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY (primary_disease_id) REFERENCES diseases (id)
);

CREATE TABLE IF NOT EXISTS diagnosis_symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    diagnosis_id INTEGER NOT NULL,
    symptom_id INTEGER NOT NULL,
    user_confidence REAL NOT NULL,
    calculated_cf REAL NOT NULL,
    FOREIGN KEY (diagnosis_id) REFERENCES diagnosis_history (id) ON DELETE CASCADE,
    FOREIGN KEY (symptom_id) REFERENCES symptoms (id)
);

CREATE TABLE IF NOT EXISTS diagnosis_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    diagnosis_id INTEGER NOT NULL,
    disease_id INTEGER NOT NULL,
    cf_score REAL NOT NULL,
    rank INTEGER NOT NULL,
    FOREIGN KEY (diagnosis_id) REFERENCES diagnosis_history (id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES diseases (id)
);

CREATE TABLE IF NOT EXISTS app_metadata (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rules_disease ON diagnostic_rules (disease_id);
CREATE INDEX IF NOT EXISTS idx_rules_symptom ON diagnostic_rules (symptom_id);
CREATE INDEX IF NOT EXISTS idx_history_date ON diagnosis_history (diagnosis_date);
`;

