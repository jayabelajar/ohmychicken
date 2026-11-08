import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES, SYMPTOMS } from '../data/knowledgeBase';

export const HomeScreen: React.FC = () => {
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);
  const clearSymptoms = useDiagnosisStore((s) => s.clearSymptoms);
  const openTestBench = useDiagnosisStore((s) => s.openTestBench);

  const handleStartDiagnosis = () => {
    clearSymptoms();
    setActiveScreen('diagnosis_symptoms');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>INFERENSI CERTAINTY FACTOR</Text>
          </View>
          <Text style={styles.heroTitle}>Mulai Diagnosis Gejala Ayam</Text>
          <Text style={styles.heroDesc}>
            Amati tanda fisik, perilaku, feses, atau gangguan pernapasan pada kawanan broiler Anda untuk deteksi dini.
          </Text>

          <TouchableOpacity style={styles.heroButton} activeOpacity={0.85} onPress={handleStartDiagnosis}>
            <Ionicons name="add-circle" size={18} color={COLORS.brand} />
            <Text style={styles.heroButtonText}>Mulai Konsultasi Baru</Text>
          </TouchableOpacity>
        </View>

        {/* Metric Grid */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.metricCard}
            activeOpacity={0.8}
            onPress={() => setActiveTab('penyakit')}
          >
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Penyakit Terdaftar</Text>
              <View style={styles.metricIconWrap}>
                <Ionicons name="book-outline" size={16} color={COLORS.brand} />
              </View>
            </View>
            <Text style={styles.metricValue}>{DISEASES.length}</Text>
            <Text style={styles.metricHint}>Lihat katalog & penanganan &rarr;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.metricCard}
            activeOpacity={0.8}
            onPress={handleStartDiagnosis}
          >
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Indikator Gejala</Text>
              <View style={styles.metricIconWrap}>
                <Ionicons name="list-outline" size={16} color={COLORS.brand} />
              </View>
            </View>
            <Text style={styles.metricValue}>{SYMPTOMS.length}</Text>
            <Text style={styles.metricHint}>5 Kategori klinis &rarr;</Text>
          </TouchableOpacity>
        </View>

        {/* Research Test Bench Shortcut Card */}
        <View style={styles.benchCard}>
          <View style={styles.benchHeader}>
            <View style={styles.benchTitleRow}>
              <View style={styles.benchDot} />
              <Text style={styles.benchTitle}>Uji Validasi 10 Kasus Jurnal</Text>
            </View>
            <View style={styles.benchBadge}>
              <Text style={styles.benchBadgeText}>Tabel 6</Text>
            </View>
          </View>
          <Text style={styles.benchDesc}>
            Coba langsung 10 sampel uji historis dari penelitian primer (Agustin et al., 2024) untuk memverifikasi akurasi CF sistem secara empiris.
          </Text>
          <TouchableOpacity style={styles.benchButton} activeOpacity={0.85} onPress={openTestBench}>
            <Ionicons name="flask-outline" size={16} color={COLORS.brand} />
            <Text style={styles.benchButtonText}>Buka Panel Uji 10 Sampel</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AKSES CEPAT</Text>
          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={styles.quickButton}
              activeOpacity={0.8}
              onPress={() => setActiveTab('riwayat')}
            >
              <Ionicons name="time-outline" size={18} color={COLORS.brand} />
              <Text style={styles.quickButtonText}>Riwayat Diagnosis</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickButton}
              activeOpacity={0.8}
              onPress={() => setActiveTab('penyakit')}
            >
              <Ionicons name="medical-outline" size={18} color={COLORS.brand} />
              <Text style={styles.quickButtonText}>Katalog Penyakit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Biosecurity Tips */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons name="shield-outline" size={18} color={COLORS.surface} />
          </View>
          <View style={styles.tipTextWrap}>
            <Text style={styles.tipTitle}>Protokol Biosekuriti Broiler</Text>
            <Text style={styles.tipDesc}>
              Lakukan pencelupan alas kaki (dipping) larutan desinfektan sebelum masuk kandang dan jaga sekam tetap kering untuk mencegah Koksidiosis dan CRD.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  scroll: {
    padding: 16,
    gap: 16,
    paddingBottom: 32
  },
  heroCard: {
    backgroundColor: COLORS.brand,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 10
  },
  heroBadgeText: {
    color: '#BAE6FD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.surface,
    marginBottom: 6
  },
  heroDesc: {
    fontSize: 12,
    color: '#DBEAFE',
    lineHeight: 18,
    marginBottom: 16
  },
  heroButton: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 12,
    gap: 8
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.brand
  },
  grid: {
    flexDirection: 'row',
    gap: 12
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.ink
  },
  metricIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.brandLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 4
  },
  metricHint: {
    fontSize: 10,
    color: COLORS.brand,
    fontWeight: '600'
  },
  benchCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 8
  },
  benchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  benchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  benchDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand
  },
  benchTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink
  },
  benchBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  benchBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.brand
  },
  benchDesc: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16
  },
  benchButton: {
    backgroundColor: COLORS.brandLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
    marginTop: 4
  },
  benchButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.brand
  },
  section: {
    gap: 8
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.muted,
    letterSpacing: 0.5
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10
  },
  quickButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 8
  },
  quickButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE'
  },
  tipIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tipTextWrap: {
    flex: 1
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 2
  },
  tipDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16
  }
});

