import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES, SYMPTOMS } from '../data/knowledgeBase';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);
  const clearSymptoms = useDiagnosisStore((s) => s.clearSymptoms);
  const openTestBench = useDiagnosisStore((s) => s.openTestBench);
  const history = useDiagnosisStore((s) => s.history);
  const openDiseaseDetail = useDiagnosisStore((s) => s.openDiseaseDetail);

  const handleStartDiagnosis = () => {
    clearSymptoms();
    setActiveScreen('diagnosis_symptoms');
  };

  const lastCase = history.length > 0 ? history[0] : null;

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 100 + Math.max(insets.bottom, 16) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO ACTIVITY CARD (Matching Reference Image 2 Style) */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <View style={styles.metricPair}>
              <View>
                <Text style={styles.metricLabel}>Total Diagnosa</Text>
                <Text style={styles.metricVal}>
                  {history.length > 0 ? `${history.length} Sesi` : '0 Sesi'}
                </Text>
              </View>
              <View>
                <Text style={styles.metricLabel}>Rata-rata CF</Text>
                <Text style={styles.metricVal}>88%</Text>
              </View>
            </View>

            <View style={styles.filterPill}>
              <Text style={styles.filterPillText}>Mingguan</Text>
              <Ionicons name="chevron-down" size={12} color={COLORS.ink} />
            </View>
          </View>

          {/* Clean Graphic Sparkline Bars */}
          <View style={styles.chartContainer}>
            {[
              { day: 'Sen', val: 40, active: false },
              { day: 'Sel', val: 65, active: false },
              { day: 'Rab', val: 85, active: false },
              { day: 'Kam', val: 50, active: false },
              { day: 'Jum', val: 95, active: true },
              { day: 'Sab', val: 30, active: false },
              { day: 'Min', val: 70, active: false }
            ].map((bar, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { height: `${bar.val}%` },
                      bar.active && styles.barFillActive
                    ]}
                  />
                </View>
                <Text style={[styles.barDay, bar.active && styles.barDayActive]}>{bar.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION: MONITORING HARI INI (Matching Reference Image "Today Activity") */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monitoring Kasus Terbaru 🐥</Text>
          <TouchableOpacity onPress={() => setActiveTab('riwayat')}>
            <Text style={styles.sectionLink}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.todayCard}>
          {/* Left Mini Bento Metric */}
          <View style={styles.todayLeftBento}>
            <View style={styles.todayIconCircle}>
              <Ionicons name="pulse" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.todayBentoNumber}>
              {lastCase ? `${lastCase.percentage}%` : '100%'}
            </Text>
            <Text style={styles.todayBentoLabel}>Akurasi Terakhir</Text>
          </View>

          {/* Right Case Overview */}
          <View style={styles.todayRightList}>
            {lastCase ? (
              <TouchableOpacity
                style={styles.caseItem}
                activeOpacity={0.7}
                onPress={() => {
                  const d = DISEASES.find((x) => x.id === lastCase.diseaseId);
                  if (d) openDiseaseDetail(d);
                }}
              >
                <View style={styles.caseIndicatorBar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.caseTitle}>{lastCase.diseaseName}</Text>
                  <Text style={styles.caseSubtitle}>
                    {lastCase.symptomsCount} gejala • Status: {lastCase.riskLevel}
                  </Text>
                </View>
                <Text style={styles.caseScore}>{lastCase.percentage}%</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noCaseText}>Belum ada sesi diagnosis terbaru</Text>
            )}

            <TouchableOpacity
              style={styles.newConsultBtn}
              activeOpacity={0.85}
              onPress={handleStartDiagnosis}
            >
              <Ionicons name="add-circle" size={16} color={COLORS.surface} />
              <Text style={styles.newConsultText}>Mulai Konsultasi Baru</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION: TWO BENTO ACTION CARDS */}
        <View style={styles.bentoRow}>
          {/* Bento 1: Katalog Penyakit */}
          <TouchableOpacity
            style={[styles.bentoBox, { backgroundColor: '#EFF6FF' }]}
            activeOpacity={0.8}
            onPress={() => setActiveTab('katalog')}
          >
            <View style={styles.bentoTop}>
              <View style={[styles.bentoIconWrap, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="book-outline" size={18} color="#2563EB" />
              </View>
              <Ionicons name="arrow-forward" size={14} color="#2563EB" />
            </View>
            <Text style={styles.bentoNumber}>{DISEASES.length}</Text>
            <Text style={styles.bentoTitle}>Penyakit Broiler</Text>
            <Text style={styles.bentoDesc}>13 Patologi veteriner</Text>
          </TouchableOpacity>

          {/* Bento 2: Indikator Gejala */}
          <TouchableOpacity
            style={[styles.bentoBox, { backgroundColor: '#F0FDF4' }]}
            activeOpacity={0.8}
            onPress={handleStartDiagnosis}
          >
            <View style={styles.bentoTop}>
              <View style={[styles.bentoIconWrap, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="list-outline" size={18} color="#16A34A" />
              </View>
              <Ionicons name="arrow-forward" size={14} color="#16A34A" />
            </View>
            <Text style={styles.bentoNumber}>{SYMPTOMS.length}</Text>
            <Text style={styles.bentoTitle}>Indikator Gejala</Text>
            <Text style={styles.bentoDesc}>5 Kategori observasi</Text>
          </TouchableOpacity>
        </View>

        {/* WORKOUT GOALS STYLE CARD: BIOSEKURITI & RISET (Matching Reference Image 2) */}
        <View style={styles.goalCard}>
          <View style={styles.goalLeft}>
            <View style={styles.goalIconCircle}>
              <Ionicons name="shield-checkmark" size={20} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.goalTitle}>Protokol Biosekuriti Kandang</Text>
              <Text style={styles.goalSub}>Dipping alas kaki & sirkulasi ventilasi</Text>
            </View>
          </View>
          <View style={styles.goalProgressBadge}>
            <Text style={styles.goalProgressText}>Optimal</Text>
          </View>
        </View>

        {/* RESEARCH BENCH BUTTON CARD */}
        <TouchableOpacity style={styles.benchCard} activeOpacity={0.85} onPress={openTestBench}>
          <View style={styles.benchLeft}>
            <View style={styles.benchIconCircle}>
              <Ionicons name="flask" size={18} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.benchTitle}>Uji Validasi 10 Sampel Jurnal</Text>
              <Text style={styles.benchSub}>Tabel 6 Jurnal Algoritma ITG (2024)</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16
  },
  activityCard: {
    backgroundColor: '#E0F2FE', // Soft sky blue tint matching image style
    borderRadius: 28,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD'
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricPair: {
    flexDirection: 'row',
    gap: 24
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0369A1'
  },
  metricVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0C4A6E',
    marginTop: 2
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4
  },
  filterPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.ink
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 72,
    paddingTop: 8
  },
  barCol: {
    alignItems: 'center',
    gap: 6
  },
  barTrack: {
    width: 28,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 14,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  barFill: {
    width: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 14
  },
  barFillActive: {
    backgroundColor: '#0284C7'
  },
  barDay: {
    fontSize: 9,
    fontWeight: '600',
    color: '#0284C7'
  },
  barDayActive: {
    color: '#0C4A6E',
    fontWeight: '800'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.2
  },
  sectionLink: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  },
  todayCard: {
    backgroundColor: '#F3E8FF', // Soft lavender tint matching reference image
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center'
  },
  todayLeftBento: {
    width: 90,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 4
  },
  todayIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayBentoNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#5B21B6'
  },
  todayBentoLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6D28D9',
    textAlign: 'center'
  },
  todayRightList: {
    flex: 1,
    gap: 10
  },
  caseItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  caseIndicatorBar: {
    width: 3,
    height: 24,
    borderRadius: 2,
    backgroundColor: '#7C3AED'
  },
  caseTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink
  },
  caseSubtitle: {
    fontSize: 9,
    color: COLORS.muted
  },
  caseScore: {
    fontSize: 12,
    fontWeight: '900',
    color: '#6D28D9'
  },
  noCaseText: {
    fontSize: 11,
    color: COLORS.muted,
    fontStyle: 'italic'
  },
  newConsultBtn: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6
  },
  newConsultText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.surface
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 12
  },
  bentoBox: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.7)',
    gap: 4
  },
  bentoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  bentoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bentoNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5
  },
  bentoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink
  },
  bentoDesc: {
    fontSize: 10,
    color: COLORS.muted
  },
  goalCard: {
    backgroundColor: '#FEF3C7', // Soft peach/amber tint matching image
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FDE68A'
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  goalIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goalTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E'
  },
  goalSub: {
    fontSize: 10,
    color: '#B45309',
    marginTop: 1
  },
  goalProgressBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14
  },
  goalProgressText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309'
  },
  benchCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1
  },
  benchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  benchIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.brandLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  benchTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink
  },
  benchSub: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1
  }
});
