import { create } from 'zustand';
import { Disease, DiseaseDiagnosisResult } from '../core/certainty-factor/types';
import { DISEASES, DIAGNOSTIC_RULES, RESEARCH_SAMPLES } from '../data/knowledgeBase';
import { diagnoseDiseases } from '../core/certainty-factor/calculateCF';

export interface UserProfile {
  id: string;
  name: string;
  farmName: string;
  email: string;
  location?: string;
  avatar?: string;
}

export interface HistoryRecord {
  id: string;
  userId: string;
  date: string;
  time: string;
  diseaseName: string;
  diseaseId: string;
  percentage: number;
  symptomsCount: number;
  riskLevel: string;
}

export type TabKey = 'beranda' | 'katalog' | 'diagnosis' | 'riwayat' | 'profil';
export type ActiveScreen =
  | 'onboarding'
  | 'auth'
  | 'main'
  | 'diagnosis_symptoms'
  | 'diagnosis_confidence'
  | 'diagnosis_result';

interface DiagnosisState {
  hasOnboarded: boolean;
  user: UserProfile | null;
  activeTab: TabKey;
  activeScreen: ActiveScreen;
  selectedSymptoms: string[];
  confidenceValues: Record<string, number>; // symptomId -> cfUser
  selectedCategory: string;
  diagnosisResults: DiseaseDiagnosisResult[] | null;
  history: HistoryRecord[];
  selectedDiseaseDetail: Disease | null;
  isTestBenchOpen: boolean;
  offlineNotification: string | null;

  // Actions
  finishOnboarding: () => void;
  login: (email: string, name?: string, farmName?: string) => void;
  register: (name: string, farmName: string, email: string) => void;
  guestLogin: () => void;
  logout: () => void;
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
  dismissNotification: () => void;
}

export const useDiagnosisStore = create<DiagnosisState>((set, get) => ({
  hasOnboarded: true,
  user: {
    id: 'USR-01',
    name: 'Budi Santoso',
    farmName: 'Berkah Broiler Farm',
    email: 'peternak@ayamcare.id',
    location: 'Ciamis, Jawa Barat'
  },
  activeTab: 'beranda',
  activeScreen: 'main',
  selectedSymptoms: [],
  confidenceValues: {},
  selectedCategory: 'SEMUA',
  diagnosisResults: null,
  offlineNotification: null,
  history: [
    {
      id: 'HIST-INIT-1',
      userId: 'USR-01',
      date: '8 Nov 2026',
      time: '18:30',
      diseaseName: 'CRD (Chronic Respiratory Disease)',
      diseaseId: 'P13',
      percentage: 99,
      symptomsCount: 5,
      riskLevel: 'SEDANG'
    },
    {
      id: 'HIST-INIT-2',
      userId: 'USR-01',
      date: '7 Nov 2026',
      time: '10:15',
      diseaseName: 'Berak Darah (Koksidiosis)',
      diseaseId: 'P06',
      percentage: 80,
      symptomsCount: 3,
      riskLevel: 'TINGGI'
    }
  ],
  selectedDiseaseDetail: null,
  isTestBenchOpen: false,

  finishOnboarding: () => {
    const { user } = get();
    set({
      hasOnboarded: true,
      activeScreen: user ? 'main' : 'auth',
      activeTab: 'beranda'
    });
  },

  login: (email, name = 'Peternak Broiler', farmName = 'Kandang Sejahtera') => {
    set({
      user: {
        id: `USR-${Date.now()}`,
        name,
        farmName,
        email,
        location: 'Jawa Barat, ID'
      },
      activeScreen: 'main',
      activeTab: 'beranda'
    });
  },

  register: (name, farmName, email) => {
    set({
      user: {
        id: `USR-${Date.now()}`,
        name,
        farmName,
        email,
        location: 'Jawa Barat, ID'
      },
      activeScreen: 'main',
      activeTab: 'beranda'
    });
  },

  guestLogin: () => {
    set({
      user: {
        id: 'GUEST',
        name: 'Tamu (Peternak)',
        farmName: 'Mode Tamu Offline',
        email: 'tamu@offline.local'
      },
      activeScreen: 'main',
      activeTab: 'beranda'
    });
  },

  logout: () => {
    set({
      user: null,
      activeScreen: 'auth'
    });
  },

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
        confidenceValues: { ...confidenceValues, [symptomId]: 0.8 }
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
    const { selectedSymptoms, confidenceValues, history, user } = get();
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
        userId: user ? user.id : 'GUEST',
        date: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        diseaseName: primary.disease.name,
        diseaseId: primary.disease.id,
        percentage: primary.percentage,
        symptomsCount: primary.matchedRules.length,
        riskLevel: primary.disease.riskLevel
      };

      set({
        diagnosisResults: results,
        activeScreen: 'diagnosis_result',
        history: [newHistoryItem, ...history.slice(0, 40)],
        offlineNotification: '✅ Diagnosis Selesai & Tersimpan Secara Offline'
      });
    } else {
      set({
        diagnosisResults: [],
        activeScreen: 'diagnosis_result',
        offlineNotification: '⚠️ Gejala Tidak Cocok dengan Basis Aturan'
      });
    }
  },

  dismissNotification: () => set({ offlineNotification: null }),

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
      user: null,
      activeTab: 'beranda',
      activeScreen: 'onboarding',
      selectedSymptoms: [],
      confidenceValues: {},
      diagnosisResults: null,
      history: [],
      offlineNotification: null
    })
}));
