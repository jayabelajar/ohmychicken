import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore, TabKey } from '../store/diagnosisStore';

export const Navbar: React.FC = () => {
  const activeTab = useDiagnosisStore((s) => s.activeTab);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);

  const tabs: Array<{ key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
    { key: 'beranda', label: 'Beranda', icon: 'home-outline' },
    { key: 'penyakit', label: 'Penyakit', icon: 'book-outline' },
    { key: 'riwayat', label: 'Riwayat', icon: 'time-outline' },
    { key: 'pengaturan', label: 'Pengaturan', icon: 'settings-outline' }
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? COLORS.brand : COLORS.muted}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? COLORS.brand : COLORS.muted, fontWeight: isActive ? '700' : '500' }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 3
  },
  tabLabel: {
    fontSize: 10
  }
});

