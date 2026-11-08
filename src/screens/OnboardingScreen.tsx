import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

export const OnboardingScreen: React.FC = () => {
  const finishOnboarding = useDiagnosisStore((s) => s.finishOnboarding);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="medkit" size={28} color={COLORS.surface} />
            </View>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>AyamCare v1.0</Text>
            </View>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>METODE CERTAINTY FACTOR</Text>
          </View>

          <Text style={styles.title}>Deteksi Dini Kesehatan Broiler Anda.</Text>
          <Text style={styles.description}>
            Sistem inferensi pakar offline untuk membantu peternak mengidentifikasi 13 penyakit ayam broiler dengan pembobotan matematis Certainty Factor berbasis riset veteriner 2024.
          </Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="cloud-offline-outline" size={20} color={COLORS.brand} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>100% Beroperasi Offline</Text>
                <Text style={styles.featureDesc}>Bekerja penuh di area perkandangan tanpa koneksi internet atau paket data.</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.brand} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Basis Riset Primer (2024)</Text>
                <Text style={styles.featureDesc}>Mengadopsi aturan pakar Jurnal Algoritma ITG dengan 40 indikator klinis.</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="calculator-outline" size={20} color={COLORS.brand} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Kombinasi Keyakinan Terukur</Text>
                <Text style={styles.featureDesc}>Menggabungkan keyakinan peternak dan bobot pakar secara deterministik.</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85} onPress={finishOnboarding}>
            <Text style={styles.ctaText}>Mulai Aplikasi Sekarang</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.surface} />
          </TouchableOpacity>
          <Text style={styles.footnote}>Aplikasi penunjang keputusan pendukung peternak mandiri</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  container: {
    padding: 24,
    minHeight: '100%',
    justifyContent: 'space-between'
  },
  topSection: {
    paddingTop: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  versionBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  versionText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.brandAccent,
    letterSpacing: 0.5
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 34,
    marginBottom: 10
  },
  description: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
    marginBottom: 24
  },
  features: {
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 20
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 12
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.brandLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink
  },
  featureDesc: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 16
  },
  bottomSection: {
    paddingTop: 24,
    paddingBottom: 12
  },
  ctaButton: {
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    gap: 8,
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3
  },
  ctaText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '700'
  },
  footnote: {
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 10
  }
});

