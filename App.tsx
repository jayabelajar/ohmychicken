import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/constants/theme';
import { useDiagnosisStore } from './src/store/diagnosisStore';
import { Navbar } from './src/components/Navbar';
import { NotificationBanner } from './src/components/NotificationBanner';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SymptomPickerScreen } from './src/screens/SymptomPickerScreen';
import { ConfidencePickerScreen } from './src/screens/ConfidencePickerScreen';
import { DiagnosisResultScreen } from './src/screens/DiagnosisResultScreen';
import { DiseaseCatalogScreen } from './src/screens/DiseaseCatalogScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { DiseaseDetailModal } from './src/components/DiseaseDetailModal';
import { ResearchBenchModal } from './src/components/ResearchBenchModal';

export default function App() {
  const hasOnboarded = useDiagnosisStore((s) => s.hasOnboarded);
  const user = useDiagnosisStore((s) => s.user);
  const activeTab = useDiagnosisStore((s) => s.activeTab);
  const activeScreen = useDiagnosisStore((s) => s.activeScreen);

  // Render active main tab (5 Menus)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <HomeScreen />;
      case 'katalog':
        return <DiseaseCatalogScreen />;
      case 'riwayat':
        return <HistoryScreen />;
      case 'profil':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Render main screen flow
  const renderContent = () => {
    // 1. Onboarding first
    if (!hasOnboarded || activeScreen === 'onboarding') {
      return <OnboardingScreen />;
    }

    // 2. Auth (Login/Register) if no user logged in
    if (!user || activeScreen === 'auth') {
      return <AuthScreen />;
    }

    // 3. Diagnosis Step 1: Select symptoms
    if (activeScreen === 'diagnosis_symptoms') {
      return <SymptomPickerScreen />;
    }

    // 4. Diagnosis Step 2: Set confidence (Certainty Factor)
    if (activeScreen === 'diagnosis_confidence') {
      return <ConfidencePickerScreen />;
    }

    // 5. Diagnosis Step 3: Result & Treatment recommendations
    if (activeScreen === 'diagnosis_result') {
      return <DiagnosisResultScreen />;
    }

    // 6. Default to main 5-tab dashboard with floating pill navbar
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
        <NotificationBanner />
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
