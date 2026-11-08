import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const user = useDiagnosisStore((s) => s.user);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);

  const displayName = user ? user.name.split(' ')[0] : 'Peternak';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'P';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          style={styles.menuBtn}
          activeOpacity={0.7}
          onPress={() => setActiveTab('profil')}
        >
          <Ionicons name="reorder-two-outline" size={24} color={COLORS.ink} />
        </TouchableOpacity>
        <View>
          <Text style={styles.greetingTitle}>
            {title || `Halo ${displayName},`}
          </Text>
          <Text style={styles.greetingSub}>
            {subtitle || (user?.farmName || 'Kawanan sehat & produktif!')}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.avatarBtn}
        activeOpacity={0.8}
        onPress={() => setActiveTab('profil')}
      >
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.canvas
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  menuBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center'
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3
  },
  greetingSub: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '500',
    marginTop: 1
  },
  avatarBtn: {
    padding: 2
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  avatarText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '800'
  }
});
