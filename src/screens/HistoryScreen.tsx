import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES } from '../data/knowledgeBase';

export const HistoryScreen: React.FC = () => {
  const history = useDiagnosisStore((s) => s.history);
  const clearHistory = useDiagnosisStore((s) => s.clearHistory);
  const openDiseaseDetail = useDiagnosisStore((s) => s.openDiseaseDetail);

  const dates = [
    { day: '6', label: '6' },
    { day: '7', label: '7' },
    { day: '8', label: '8 Nov 2026', active: true },
    { day: '9', label: '9' },
    { day: '10', label: '10' },
    { day: '11', label: '11' }
  ];

  const [selectedDate, setSelectedDate] = useState('8 Nov 2026');

  const handleClearHistory = () => {
    if (history.length === 0) return;
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus seluruh catatan diagnosis offline?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus Semua', style: 'destructive', onPress: clearHistory }
      ]
    );
  };

  // Calculate average accuracy
  const avgAccuracy =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / history.length)
      : 0;

  return (
    <View style={styles.container}>
      <Header title="Riwayat & Aktivitas" subtitle="Monitoring & Arsip Kasus Broiler" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Date Selector (Slide 3 inspired) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateSelector}
        >
          {dates.map((item, idx) => {
            const isSelected = item.label === selectedDate;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.datePill, isSelected && styles.datePillActive]}
                onPress={() => setSelectedDate(item.label)}
                activeOpacity={0.7}
              >
                <Text style={[styles.datePillText, isSelected && styles.datePillTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Top 2 Bento Cards Side by Side (Like Slide 3) */}
        <View style={styles.topBentoRow}>
          {/* Mint Bento: Total Kasus */}
          <View style={[styles.bentoCard, { backgroundColor: '#DCFCE7' }]}>
            <View style={styles.bentoTop}>
              <Text style={styles.bentoTitle}>Total Diagnosa</Text>
              <View style={styles.bentoIconCircle}>
                <Ionicons name="paw" size={14} color="#15803D" />
              </View>
            </View>
            <View style={styles.bentoValueCircle}>
              <Text style={styles.bentoBigNumber}>{history.length}</Text>
              <Text style={styles.bentoSubText}>Kasus</Text>
            </View>
          </View>

          {/* Soft Lavender Bento: Rata-rata Akurasi */}
          <View style={[styles.bentoCard, { backgroundColor: '#F3E8FF' }]}>
            <View style={styles.bentoTop}>
              <Text style={styles.bentoTitle}>Akurasi CF</Text>
              <View style={styles.bentoIconCircle}>
                <Ionicons name="pulse" size={14} color="#7E22CE" />
              </View>
            </View>
            <View style={styles.bentoChartWrap}>
              {/* Mini wave path representation */}
              <View style={styles.miniWaveContainer}>
                <View style={[styles.waveDot, { height: 16 }]} />
                <View style={[styles.waveDot, { height: 28 }]} />
                <View style={[styles.waveDot, { height: 20 }]} />
                <View style={[styles.waveDot, { height: 36 }]} />
                <View style={[styles.waveDot, { height: 26 }]} />
                <View style={[styles.waveDot, { height: 42 }]} />
              </View>
              <Text style={styles.bentoAccNumber}>{avgAccuracy}%</Text>
              <Text style={styles.bentoSubText}>Rata-rata</Text>
            </View>
          </View>
        </View>

        {/* Weekly Bar Chart Bento Card (Matching Slide 3) */}
        <View style={styles.chartBentoCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTotalNumber}>
                {history.length > 0 ? `${history.length * 3 + 4} Kasus` : '0 Kasus'}
              </Text>
              <Text style={styles.chartSubtitle}>Frekuensi mingguan 🐥</Text>
            </View>
            <View style={styles.filterPill}>
              <Text style={styles.filterPillText}>Minggu ini</Text>
              <Ionicons name="chevron-down" size={12} color="#0284C7" />
            </View>
          </View>

          {/* 7 Vertical Pill Bars */}
          <View style={styles.barChartContainer}>
            {[
              { day: 'Sen', h1: 45, h2: 25 },
              { day: 'Sel', h1: 70, h2: 40 },
              { day: 'Rab', h1: 55, h2: 30 },
              { day: 'Kam', h1: 85, h2: 50, active: true },
              { day: 'Jum', h1: 65, h2: 35 },
              { day: 'Sab', h1: 90, h2: 60 },
              { day: 'Min', h1: 40, h2: 20 }
            ].map((bar, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barPillTrack}>
                  <View
                    style={[
                      styles.barPillFill,
                      { height: `${bar.h1}%` },
                      bar.active && styles.barPillFillActive
                    ]}
                  />
                </View>
                <Text style={[styles.barDayText, bar.active && styles.barDayTextActive]}>
                  {bar.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Consultation Records Section */}
        <View style={styles.recordsSectionHeader}>
          <Text style={styles.sectionTitle}>Catatan Konsultasi Terakhir</Text>
          {history.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={handleClearHistory}>
              <Ionicons name="trash-outline" size={14} color="#EF4444" />
              <Text style={styles.clearBtnText}>Bersihkan</Text>
            </TouchableOpacity>
          )}
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="file-tray-outline" size={44} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Belum Ada Catatan Konsultasi</Text>
            <Text style={styles.emptyDesc}>
              Diagnosis yang Anda lakukan akan tersimpan secara otomatis dan aman di penyimpanan lokal HP ini.
            </Text>
          </View>
        ) : (
          history.map((item) => {
            const diseaseObj = DISEASES.find((d) => d.id === item.diseaseId);
            return (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyCardTop}>
                  <View style={styles.historyInfo}>
                    <View style={styles.dateBadge}>
                      <Ionicons name="calendar-outline" size={11} color="#64748B" />
                      <Text style={styles.dateBadgeText}>
                        {item.date} • {item.time}
                      </Text>
                    </View>
                    <Text style={styles.diseaseName}>{item.diseaseName}</Text>
                  </View>
                  <View style={styles.pctBadge}>
                    <Text style={styles.pctText}>{item.percentage}%</Text>
                    <Text style={styles.pctLabel}>CF</Text>
                  </View>
                </View>

                <View style={styles.historyCardBottom}>
                  <View style={styles.symptomIndicator}>
                    <Ionicons name="checkbox-outline" size={14} color="#0284C7" />
                    <Text style={styles.symptomText}>
                      {item.symptomsCount} Gejala terkonfirmasi
                    </Text>
                  </View>
                  {diseaseObj && (
                    <TouchableOpacity
                      style={styles.detailBtn}
                      activeOpacity={0.8}
                      onPress={() => openDiseaseDetail(diseaseObj)}
                    >
                      <Text style={styles.detailBtnText}>Lihat Solusi</Text>
                      <Ionicons name="arrow-forward" size={13} color="#0284C7" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
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
    paddingBottom: 115
  },
  dateSelector: {
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  datePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  datePillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A'
  },
  datePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  datePillTextActive: {
    color: '#FFFFFF'
  },
  topBentoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16
  },
  bentoCard: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between'
  },
  bentoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bentoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155'
  },
  bentoIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bentoValueCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    marginTop: 8
  },
  bentoBigNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A'
  },
  bentoSubText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B'
  },
  bentoChartWrap: {
    alignItems: 'center',
    marginTop: 4
  },
  miniWaveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 38,
    marginBottom: 4
  },
  waveDot: {
    width: 5,
    borderRadius: 3,
    backgroundColor: '#A855F7'
  },
  bentoAccNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: '#581C87'
  },
  chartBentoCard: {
    backgroundColor: '#E0F2FE',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  chartTotalNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0369A1'
  },
  chartSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284C7',
    marginTop: 2
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7'
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 110,
    paddingTop: 10
  },
  barCol: {
    alignItems: 'center',
    gap: 6
  },
  barPillTrack: {
    width: 24,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  barPillFill: {
    width: '100%',
    backgroundColor: '#7DD3FC',
    borderRadius: 12
  },
  barPillFillActive: {
    backgroundColor: '#0284C7'
  },
  barDayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7'
  },
  barDayTextActive: {
    color: '#0F172A',
    fontWeight: '900'
  },
  recordsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444'
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed'
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
    marginTop: 12,
    marginBottom: 6
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  historyCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  historyInfo: {
    flex: 1
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4
  },
  dateBadgeText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600'
  },
  diseaseName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 20
  },
  pctBadge: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center'
  },
  pctText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0284C7'
  },
  pctLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0284C7'
  },
  historyCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  symptomIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  symptomText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600'
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7'
  }
});
