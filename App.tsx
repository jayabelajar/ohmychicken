import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/constants/theme';
import { useDiagnosisStore } from './src/store/diagnosisStore';
import { Navbar } from './src/components/Navbar';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SymptomPickerScreen } from './src/screens/SymptomPickerScreen';
import { ConfidencePickerScreen } from './src/screens/ConfidencePickerScreen';
import { DiagnosisResultScreen } from './src/screens/DiagnosisResultScreen';
import { DiseaseCatalogScreen } from './src/screens/DiseaseCatalogScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DiseaseDetailModal } from './src/components/DiseaseDetailModal';
import { ResearchBenchModal } from './src/components/ResearchBenchModal';

export default function App() {
  const hasOnboarded = useDiagnosisStore((s) => s.hasOnboarded);
  const activeTab = useDiagnosisStore((s) => s.activeTab);
  const activeScreen = useDiagnosisStore((s) => s.activeScreen);

  // Render active main tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <HomeScreen />;
      case 'penyakit':
        return <DiseaseCatalogScreen />;
      case 'riwayat':
        return <HistoryScreen />;
      case 'pengaturan':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Render screen
  const renderContent = () => {
    if (!hasOnboarded || activeScreen === 'onboarding') {
      return <OnboardingScreen />;
    }

    if (activeScreen === 'diagnosis_symptoms') {
      return <SymptomPickerScreen />;
    }

    if (activeScreen === 'diagnosis_confidence') {
      return <ConfidencePickerScreen />;
    }

    if (activeScreen === 'diagnosis_result') {
      return <DiagnosisResultScreen />;
    }

    // Default to main tabs
    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabContent}>{renderTabContent()}</View>
        <Navbar />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        {renderContent()}
        <DiseaseDetailModal />
        <ResearchBenchModal />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  tabContainer: {
    flex: 1
  },
  tabContent: {
    flex: 1
  }
});
