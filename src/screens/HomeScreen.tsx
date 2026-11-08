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
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO ACTIVITY CARD (Bento Kurva Mingguan - Matching Slide 2) */}
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
                <Text style={styles.metricVal}>
                  {history.length > 0
                    ? `${Math.round(history.reduce((a, b) => a + b.percentage, 0) / history.length)}%`
                    : '100%'}
                </Text>
              </View>
            </View>

            <View style={styles.filterPill}>
              <Text style={styles.filterPillText}>Mingguan</Text>
              <Ionicons name="chevron-down" size={12} color={COLORS.brandNavy} />
            </View>
          </View>

          {/* Clean Graphic Sparkline Bars in Nuansa Biru */}
          <View style={styles.chartContainer}>
            {[
              { day: 'Sen', val: 40, active: false },
              { day: 'Sel', val: 65, active: false },
              { day: 'Rab', val: 85, active: false },
              { day: 'Kam', val: 50, active: false },
              { day: 'Jum', val: 95, active: true },
              { day: 'Sab', val: 35, active: false },
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

        {/* SECTION: MONITORING HARI INI */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monitoring Kasus Terkini</Text>
          <TouchableOpacity onPress={() => setActiveTab('riwayat')}>
            <Text style={styles.sectionLink}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.todayCard}>
          <View style={styles.todayLeftBento}>
            <View style={styles.todayIconCircle}>
              <Ionicons name="pulse" size={18} color={COLORS.brand} />
            </View>
            <Text style={styles.todayBentoNumber}>
              {lastCase ? `${lastCase.percentage}%` : '100%'}
            </Text>
            <Text style={styles.todayBentoLabel}>Akurasi CF</Text>
          </View>

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
                  <Text style={styles.caseTitle} numberOfLines={1}>{lastCase.diseaseName}</Text>
                  <Text style={styles.caseSubtitle} numberOfLines={1}>
                    {lastCase.symptomsCount} gejala • Risiko: {lastCase.riskLevel}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noCaseText}>Belum ada sesi diagnosis tersimpan</Text>
            )}

            <TouchableOpacity
              style={styles.newConsultBtn}
              activeOpacity={0.85}
              onPress={handleStartDiagnosis}
            >
              <Ionicons name="add-circle" size={15} color="#FFFFFF" />
              <Text style={styles.newConsultText}>Mulai Konsultasi Baru</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION: TWO BENTO ACTION CARDS */}
        <View style={styles.bentoRow}>
          {/* Bento 1: Katalog Penyakit */}
          <TouchableOpacity
            style={[styles.bentoBox, { backgroundColor: COLORS.bentoBlue, borderColor: COLORS.bentoBlueBorder }]}
            activeOpacity={0.8}
            onPress={() => setActiveTab('katalog')}
          >
            <View style={styles.bentoTop}>
              <View style={[styles.bentoIconWrap, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="book-outline" size={16} color={COLORS.brandDark} />
              </View>
              <Ionicons name="arrow-forward" size={13} color={COLORS.brandDark} />
            </View>
            <Text style={styles.bentoNumber}>{DISEASES.length}</Text>
            <Text style={styles.bentoTitle}>Penyakit Broiler</Text>
            <Text style={styles.bentoDesc}>13 Patologi data</Text>
          </TouchableOpacity>

          {/* Bento 2: Indikator Gejala */}
          <TouchableOpacity
            style={[styles.bentoBox, { backgroundColor: COLORS.surface, borderColor: COLORS.line }]}
            activeOpacity={0.8}
            onPress={handleStartDiagnosis}
          >
            <View style={styles.bentoTop}>
              <View style={[styles.bentoIconWrap, { backgroundColor: COLORS.bentoBlue }]}>
                <Ionicons name="list-outline" size={16} color={COLORS.brand} />
              </View>
              <Ionicons name="arrow-forward" size={13} color={COLORS.brand} />
            </View>
            <Text style={styles.bentoNumber}>{SYMPTOMS.length}</Text>
            <Text style={styles.bentoTitle}>Indikator Gejala</Text>
            <Text style={styles.bentoDesc}>5 Kategori klinis</Text>
          </TouchableOpacity>
        </View>

        {/* BIOSECURITY PROTOCOL CARD (Bento Style) */}
        <View style={styles.goalCard}>
          <View style={styles.goalLeft}>
            <View style={styles.goalIconCircle}>
              <Ionicons name="shield-checkmark" size={18} color="#0284C7" />
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

        {/* RESEARCH BENCH TEST CARD */}
        <TouchableOpacity style={styles.benchCard} activeOpacity={0.85} onPress={openTestBench}>
          <View style={styles.benchLeft}>
            <View style={styles.benchIconCircle}>
              <Ionicons name="flask" size={17} color={COLORS.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.benchBadgeRow}>
                <Text style={styles.benchBadgeText}>Validasi Ilmiah</Text>
              </View>
              <Text style={styles.benchTitle}>Uji Sampel Jurnal Agustin (2024)</Text>
              <Text style={styles.benchSub}>Verifikasi 4 sampel data uji makalah ITG</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.brand} />
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 14
  },
  activityCard: {
    backgroundColor: COLORS.bentoBlue,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricPair: {
    flexDirection: 'row',
    gap: 20
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4
  },
  filterPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.brandNavy
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 68,
    paddingTop: 8
  },
  barCol: {
    alignItems: 'center',
    gap: 5
  },
  barTrack: {
    width: 26,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 13,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  barFill: {
    width: '100%',
    backgroundColor: '#7DD3FC',
    borderRadius: 13
  },
  barFillActive: {
    backgroundColor: COLORS.brand
  },
  barDay: {
    fontSize: 9.5,
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
    fontSize: 13,
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
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  todayLeftBento: {
    width: 80,
    height: 88,
    backgroundColor: COLORS.bentoBlue,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    gap: 3
  },
  todayIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayBentoNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.brandDark
  },
  todayBentoLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#0369A1'
  },
  todayRightList: {
    flex: 1,
    justifyContent: 'center',
    gap: 8
  },
  caseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  caseIndicatorBar: {
    width: 3,
    height: 28,
    backgroundColor: COLORS.brand,
    borderRadius: 2
  },
  caseTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.ink
  },
  caseSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1
  },
  noCaseText: {
    fontSize: 11,
    color: COLORS.muted
  },
  newConsultBtn: {
    backgroundColor: COLORS.brandNavy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 14,
    gap: 6
  },
  newConsultText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 12
  },
  bentoBox: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1
  },
  bentoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  bentoIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bentoNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink
  },
  bentoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2
  },
  bentoDesc: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1
  },
  goalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.line
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  goalIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goalTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.ink
  },
  goalSub: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1
  },
  goalProgressBadge: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  goalProgressText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D'
  },
  benchCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder
  },
  benchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  benchIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  benchBadgeRow: {
    marginBottom: 2
  },
  benchBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.brandDark,
    textTransform: 'uppercase'
  },
  benchTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.ink
  },
  benchSub: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1
  }
});
