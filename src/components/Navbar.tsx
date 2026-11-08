import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore, TabKey } from '../store/diagnosisStore';

export const Navbar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const activeTab = useDiagnosisStore((s) => s.activeTab);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const clearSymptoms = useDiagnosisStore((s) => s.clearSymptoms);

  // 5 Menus requested
  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    activeIcon: keyof typeof Ionicons.glyphMap;
    isAction?: boolean;
  }> = [
    { key: 'beranda', label: 'Beranda', icon: 'home-outline', activeIcon: 'home' },
    { key: 'katalog', label: 'Katalog', icon: 'book-outline', activeIcon: 'book' },
    { key: 'diagnosis', label: 'Diagnosa', icon: 'add', activeIcon: 'add', isAction: true },
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

  // Safe bottom clearance for Android 3-button floating navigation and gesture bars
  const bottomOffset = Platform.OS === 'android' ? Math.max(insets.bottom, 16) : Math.max(insets.bottom, 14);

  return (
    <View style={[styles.floatingWrapper, { bottom: bottomOffset }]}>
      <View style={styles.floatingBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          if (tab.isAction) {
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.actionButton}
                activeOpacity={0.85}
                onPress={() => handleTabPress(tab)}
              >
                <View style={styles.actionCircle}>
                  <Ionicons name="medkit" size={20} color={COLORS.surface} />
                </View>
                <Text style={styles.actionLabel}>Diagnosa</Text>
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
                  size={20}
                  color={isActive ? COLORS.surface : COLORS.muted}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
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
  floatingWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 99
  },
  floatingBar: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 68,
    borderRadius: 36,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWrapActive: {
    backgroundColor: '#1E293B' // Reference image style: dark rounded pill for active tab
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2
  },
  tabLabelActive: {
    color: '#1E293B',
    fontWeight: '800'
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8
  },
  actionCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6
  },
  actionLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.brand,
    marginTop: 2
  }
});
