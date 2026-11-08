import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showOfflinePill?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'AyamCare',
  subtitle = 'Sistem Pakar Broiler',
  showOfflinePill = true
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>AC</Text>
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>BROILER</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {showOfflinePill && (
        <View style={styles.offlinePill}>
          <View style={styles.pulseDot} />
          <Text style={styles.offlineText}>Offline Siap</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.canvas
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  logoText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '800'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink
  },
  tag: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.brand
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 1
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 6
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981'
  },
  offlineText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.ink
  }
});

