import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore, TabKey } from '../store/diagnosisStore';

export const Navbar: React.FC = () => {
  const activeTab = useDiagnosisStore((s) => s.activeTab);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const clearSymptoms = useDiagnosisStore((s) => s.clearSymptoms);

  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    activeIcon: keyof typeof Ionicons.glyphMap;
    isAction?: boolean;
  }> = [
    { key: 'beranda', label: 'Beranda', icon: 'home-outline', activeIcon: 'home' },
    { key: 'katalog', label: 'Katalog', icon: 'book-outline', activeIcon: 'book' },
    { key: 'diagnosis', label: 'Diagnosa', icon: 'medkit', activeIcon: 'medkit', isAction: true },
    { key: 'riwayat', label: 'Riwayat', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
    { key: 'profil', label: 'Profil', icon: 'person-outline', activeIcon: 'person' }
  ];

  const handleTabPress = (tab: typeof tabs[0]) => {
    if (tab.isAction) {
      clearSymptoms();
      setActiveScreen('diagnosis_symptoms');
    } else {
      setActiveTab(tab.key);
    }
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.floatingBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          if (tab.isAction) {
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.actionTab}
                activeOpacity={0.85}
                onPress={() => handleTabPress(tab)}
              >
                <View style={styles.actionCircle}>
                  <Ionicons name="medkit" size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.actionLabel} numberOfLines={1}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleTabPress(tab)}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={19}
                  color={isActive ? '#FFFFFF' : COLORS.muted}
                />
              </View>
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: COLORS.canvas
  },
  floatingBar: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 24,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWrapActive: {
    backgroundColor: COLORS.brandNavy // Modern high-contrast dark pill as in reference image
  },
  tabLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2,
    letterSpacing: -0.2
  },
  tabLabelActive: {
    color: COLORS.brandNavy,
    fontWeight: '800'
  },
  actionTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2
  },
  actionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },
  actionLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.brand,
    marginTop: 2,
    letterSpacing: -0.2
  }
});
