import { create } from 'zustand';
import { Disease, DiseaseDiagnosisResult } from '../core/certainty-factor/types';
import { DISEASES, DIAGNOSTIC_RULES, RESEARCH_SAMPLES } from '../data/knowledgeBase';
import { diagnoseDiseases } from '../core/certainty-factor/calculateCF';

export interface HistoryRecord {
  id: string;
  date: string;
  time: string;
  diseaseName: string;
  diseaseId: string;
  percentage: number;
  symptomsCount: number;
}

export type TabKey = 'beranda' | 'penyakit' | 'riwayat' | 'pengaturan';
export type ActiveScreen = 'onboarding' | 'main' | 'diagnosis_symptoms' | 'diagnosis_confidence' | 'diagnosis_result';

interface DiagnosisState {
  hasOnboarded: boolean;
  activeTab: TabKey;
  activeScreen: ActiveScreen;
  selectedSymptoms: string[];
  confidenceValues: Record<string, number>; // symptomId -> cfUser
  selectedCategory: string;
  diagnosisResults: DiseaseDiagnosisResult[] | null;
  history: HistoryRecord[];
  selectedDiseaseDetail: Disease | null;
  isTestBenchOpen: boolean;

  // Actions
  finishOnboarding: () => void;
  setActiveTab: (tab: TabKey) => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  setSelectedCategory: (cat: string) => void;
  toggleSymptom: (symptomId: string) => void;
  setSymptomConfidence: (symptomId: string, value: number) => void;
  clearSymptoms: () => void;
  calculateResult: () => void;
  openDiseaseDetail: (disease: Disease) => void;
  closeDiseaseDetail: () => void;
  openTestBench: () => void;
  closeTestBench: () => void;
  runTestSample: (sampleId: number) => void;
  clearHistory: () => void;
  resetAll: () => void;
}

export const useDiagnosisStore = create<DiagnosisState>((set, get) => ({
  hasOnboarded: true, // Default to true or can be set to false for first time
  activeTab: 'beranda',
  activeScreen: 'main',
  selectedSymptoms: [],
  confidenceValues: {},
  selectedCategory: 'SEMUA',
  diagnosisResults: null,
  history: [
    {
      id: 'HIST-INIT',
      date: '8 Nov 2026',
      time: '18:30',
      diseaseName: 'CRD (Chronic Respiratory Disease)',
      diseaseId: 'P13',
      percentage: 99,
      symptomsCount: 5
    }
  ],
  selectedDiseaseDetail: null,
  isTestBenchOpen: false,

  finishOnboarding: () => set({ hasOnboarded: true, activeScreen: 'main', activeTab: 'beranda' }),
  setActiveTab: (tab) => set({ activeTab: tab, activeScreen: 'main' }),
  setActiveScreen: (screen) => set({ activeScreen: screen }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  toggleSymptom: (symptomId) => {
    const { selectedSymptoms, confidenceValues } = get();
    const exists = selectedSymptoms.includes(symptomId);
    if (exists) {
      const nextSymptoms = selectedSymptoms.filter((id) => id !== symptomId);
      const nextConf = { ...confidenceValues };
      delete nextConf[symptomId];
      set({ selectedSymptoms: nextSymptoms, confidenceValues: nextConf });
    } else {
      set({
        selectedSymptoms: [...selectedSymptoms, symptomId],
        confidenceValues: { ...confidenceValues, [symptomId]: 0.8 } // Default: Yakin (0.8)
      });
    }
  },

  setSymptomConfidence: (symptomId, value) => {
    const { confidenceValues } = get();
    set({
      confidenceValues: { ...confidenceValues, [symptomId]: value }
    });
  },

  clearSymptoms: () => set({ selectedSymptoms: [], confidenceValues: {} }),

  calculateResult: () => {
    const { selectedSymptoms, confidenceValues, history } = get();
    const selections = selectedSymptoms.map((id) => ({
      symptomId: id,
      userConfidence: confidenceValues[id] ?? 0.8
    }));

    const results = diagnoseDiseases(DISEASES, DIAGNOSTIC_RULES, selections);

    if (results.length > 0) {
      const primary = results[0];
      const now = new Date();
      const newHistoryItem: HistoryRecord = {
        id: `HIST-${Date.now()}`,
        date: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        diseaseName: primary.disease.name,
        diseaseId: primary.disease.id,
        percentage: primary.percentage,
        symptomsCount: primary.matchedRules.length
      };

      set({
        diagnosisResults: results,
        activeScreen: 'diagnosis_result',
        history: [newHistoryItem, ...history.slice(0, 30)]
      });
    } else {
      set({
        diagnosisResults: [],
        activeScreen: 'diagnosis_result'
      });
    }
  },

  openDiseaseDetail: (disease) => set({ selectedDiseaseDetail: disease }),
  closeDiseaseDetail: () => set({ selectedDiseaseDetail: null }),
  openTestBench: () => set({ isTestBenchOpen: true }),
  closeTestBench: () => set({ isTestBenchOpen: false }),

  runTestSample: (sampleId) => {
    const sample = RESEARCH_SAMPLES.find((s) => s.id === sampleId);
    if (!sample) return;

    const conf: Record<string, number> = {};
    sample.symptoms.forEach((s) => {
      conf[s] = 0.8;
    });

    set({
      selectedSymptoms: sample.symptoms,
      confidenceValues: conf,
      isTestBenchOpen: false
    });

    get().calculateResult();
  },

  clearHistory: () => set({ history: [] }),
  resetAll: () =>
    set({
      hasOnboarded: false,
      activeTab: 'beranda',
      activeScreen: 'onboarding',
      selectedSymptoms: [],
      confidenceValues: {},
      diagnosisResults: null,
      history: []
    })
}));

