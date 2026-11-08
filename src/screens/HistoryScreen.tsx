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
    { day: '6', label: '6 Nov' },
    { day: '7', label: '7 Nov' },
    { day: '8', label: '8 Nov 2026', active: true },
    { day: '9', label: '9 Nov' },
    { day: '10', label: '10 Nov' }
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

  const avgAccuracy =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / history.length)
      : 100;

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

        {/* Top 2 Bento Cards Side by Side (Consistent Nuansa Biru) */}
        <View style={styles.topBentoRow}>
          {/* Bento 1: Total Diagnosa */}
          <View style={[styles.bentoCard, { backgroundColor: COLORS.bentoBlue, borderColor: COLORS.bentoBlueBorder }]}>
            <View style={styles.bentoTop}>
              <Text style={styles.bentoTitle}>Total Diagnosa</Text>
              <View style={styles.bentoIconCircle}>
                <Ionicons name="paw" size={13} color={COLORS.brand} />
              </View>
            </View>
            <View style={styles.bentoValueCircle}>
              <Text style={styles.bentoBigNumber}>{history.length}</Text>
              <Text style={styles.bentoSubText}>Kasus</Text>
            </View>
          </View>

          {/* Bento 2: Rata-rata Akurasi CF */}
          <View style={[styles.bentoCard, { backgroundColor: COLORS.surface, borderColor: COLORS.line }]}>
            <View style={styles.bentoTop}>
              <Text style={styles.bentoTitle}>Akurasi CF</Text>
              <View style={styles.bentoIconCircle}>
                <Ionicons name="pulse" size={13} color={COLORS.brand} />
              </View>
            </View>
            <View style={styles.bentoChartWrap}>
              <View style={styles.miniWaveContainer}>
                <View style={[styles.waveDot, { height: 14 }]} />
                <View style={[styles.waveDot, { height: 24 }]} />
                <View style={[styles.waveDot, { height: 18 }]} />
                <View style={[styles.waveDot, { height: 32 }]} />
                <View style={[styles.waveDot, { height: 22 }]} />
                <View style={[styles.waveDot, { height: 36 }]} />
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
                {history.length > 0 ? `${history.length * 2 + 5} Kasus` : '0 Kasus'}
              </Text>
              <Text style={styles.chartSubtitle}>Frekuensi mingguan 🐥</Text>
            </View>
            <View style={styles.filterPill}>
              <Text style={styles.filterPillText}>Minggu ini</Text>
              <Ionicons name="chevron-down" size={11} color={COLORS.brandDark} />
            </View>
          </View>

          {/* 7 Vertical Pill Bars */}
          <View style={styles.barChartContainer}>
            {[
              { day: 'Sen', h1: 45 },
              { day: 'Sel', h1: 70 },
              { day: 'Rab', h1: 55 },
              { day: 'Kam', h1: 85, active: true },
              { day: 'Jum', h1: 65 },
              { day: 'Sab', h1: 90 },
              { day: 'Min', h1: 40 }
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
              <Ionicons name="trash-outline" size={13} color={COLORS.danger} />
              <Text style={styles.clearBtnText}>Bersihkan</Text>
            </TouchableOpacity>
          )}
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="file-tray-outline" size={40} color={COLORS.muted} />
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
                      <Ionicons name="calendar-outline" size={11} color={COLORS.muted} />
                      <Text style={styles.dateBadgeText}>
                        {item.date} • {item.time}
                      </Text>
                    </View>
                    <Text style={styles.diseaseName} numberOfLines={1}>{item.diseaseName}</Text>
                  </View>
                  <View style={styles.pctBadge}>
                    <Text style={styles.pctText}>{item.percentage}%</Text>
                    <Text style={styles.pctLabel}>CF</Text>
                  </View>
                </View>

                <View style={styles.historyCardBottom}>
                  <View style={styles.symptomIndicator}>
                    <Ionicons name="checkbox-outline" size={13} color={COLORS.brand} />
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
                      <Ionicons name="arrow-forward" size={12} color={COLORS.brand} />
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20
  },
  dateSelector: {
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  datePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  datePillActive: {
    backgroundColor: COLORS.brandNavy,
    borderColor: COLORS.brandNavy
  },
  datePillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.muted
  },
  datePillTextActive: {
    color: '#FFFFFF'
  },
  topBentoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 14
  },
  bentoCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    minHeight: 110,
    justifyContent: 'space-between'
  },
  bentoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bentoTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.inkSecondary
  },
  bentoIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bentoValueCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignSelf: 'center',
    marginTop: 6
  },
  bentoBigNumber: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.ink
  },
  bentoSubText: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.muted
  },
  bentoChartWrap: {
    alignItems: 'center',
    marginTop: 2
  },
  miniWaveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 34,
    marginBottom: 4
  },
  waveDot: {
    width: 4.5,
    borderRadius: 3,
    backgroundColor: COLORS.brand
  },
  bentoAccNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.brandDark
  },
  chartBentoCard: {
    backgroundColor: COLORS.bentoBlue,
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  chartTotalNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0369A1'
  },
  chartSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284C7',
    marginTop: 2
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4
  },
  filterPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.brandDark
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 95,
    paddingTop: 8
  },
  barCol: {
    alignItems: 'center',
    gap: 5
  },
  barPillTrack: {
    width: 22,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 11,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  barPillFill: {
    width: '100%',
    backgroundColor: '#7DD3FC',
    borderRadius: 11
  },
  barPillFillActive: {
    backgroundColor: COLORS.brand
  },
  barDayText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#0284C7'
  },
  barDayTextActive: {
    color: COLORS.ink,
    fontWeight: '900'
  },
  recordsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.inkSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderStyle: 'dashed'
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    marginTop: 10,
    marginBottom: 4
  },
  emptyDesc: {
    fontSize: 11.5,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 16
  },
  historyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2
  },
  historyCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10
  },
  historyInfo: {
    flex: 1
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3
  },
  dateBadgeText: {
    fontSize: 9.5,
    color: COLORS.muted,
    fontWeight: '600'
  },
  diseaseName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 18
  },
  pctBadge: {
    backgroundColor: COLORS.bentoBlue,
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center'
  },
  pctText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.brand
  },
  pctLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: COLORS.brand
  },
  historyCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lineSubtle
  },
  symptomIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  symptomText: {
    fontSize: 10.5,
    color: COLORS.muted,
    fontWeight: '600'
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  detailBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.brand
  }
});
