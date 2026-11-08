import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

export const DiagnosisResultScreen: React.FC = () => {
  const diagnosisResults = useDiagnosisStore((s) => s.diagnosisResults);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const setActiveTab = useDiagnosisStore((s) => s.setActiveTab);
  const openDiseaseDetail = useDiagnosisStore((s) => s.openDiseaseDetail);

  const [isCalcExpanded, setIsCalcExpanded] = useState(false);

  if (!diagnosisResults || diagnosisResults.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.warning} />
          <Text style={styles.emptyTitle}>Bukti Klinis Belum Cukup</Text>
          <Text style={styles.emptyDesc}>
            Gejala yang dipilih tidak cocok secara signifikan dengan basis aturan patologi broiler manapun. Harap konsultasikan dengan dokter hewan.
          </Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setActiveScreen('diagnosis_symptoms')}>
            <Text style={styles.primaryBtnText}>Ulangi Pilih Gejala</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const primary = diagnosisResults[0];
  const differentials = diagnosisResults.slice(1, 4).filter((r) => r.cfScore > 0.05);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hasil Diagnosis AyamCare: Terindikasi ${primary.disease.name} dengan kepastian ${primary.percentage}% (Metode Certainty Factor).`
      });
    } catch (e) {
      // Ignored
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => { setActiveTab('beranda'); setActiveScreen('main'); }}>
          <Ionicons name="arrow-back" size={20} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HASIL DIAGNOSIS AYAMCARE</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.brand} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Primary Match Card */}
        <View style={styles.primaryCard}>
          <View style={styles.primaryTop}>
            <View style={{ flex: 1 }}>
              <View style={styles.matchBadge}>
                <Ionicons name="checkmark-circle" size={12} color={COLORS.brand} />
                <Text style={styles.matchBadgeText}>INDIKASI PALING KUAT</Text>
              </View>
              <Text style={styles.diseaseName}>{primary.disease.name}</Text>
              <Text style={styles.diseaseLatin}>{primary.disease.latinName}</Text>
            </View>
            <View style={styles.pctWrap}>
              <Text style={styles.pctText}>{primary.percentage}%</Text>
              <Text style={styles.pctSub}>Certainty Factor</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${primary.percentage}%` }]} />
          </View>

          <View style={styles.primaryFooter}>
            <View style={styles.footerRule}>
              <Ionicons name="hardware-chip-outline" size={14} color={COLORS.brand} />
              <Text style={styles.footerRuleText}>Shortliffe & Buchanan Rule</Text>
            </View>
            <Text style={styles.footerCount}>{primary.matchedRules.length} gejala cocok</Text>
          </View>
        </View>

        {/* Calculation Accordion */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.accordionHeader}
            activeOpacity={0.7}
            onPress={() => setIsCalcExpanded(!isCalcExpanded)}
          >
            <View style={styles.accordionTitleRow}>
              <Ionicons name="calculator-outline" size={18} color={COLORS.brand} />
              <Text style={styles.cardTitle}>Rincian Perhitungan Matematis</Text>
            </View>
            <Ionicons
              name={isCalcExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={COLORS.muted}
            />
          </TouchableOpacity>

          {isCalcExpanded && (
            <View style={styles.accordionBody}>
              <Text style={styles.formulaText}>
                Rumus sekuensial: CF_comb = CF1 + CF2 * (1 - CF1)
              </Text>
              <View style={styles.stepsBox}>
                {primary.steps.map((step, idx) => (
                  <Text key={idx} style={styles.stepLine}>
                    {step}
                  </Text>
                ))}
                <Text style={styles.stepFinal}>
                  Skor Akhir: {primary.cfScore.toFixed(4)} &rarr; {primary.percentage}%
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Differential Diagnoses */}
        {differentials.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DIFERENSIAL DIAGNOSIS (ALTERNATIF LAIN)</Text>
            <View style={styles.diffList}>
              {differentials.map((item) => (
                <TouchableOpacity
                  key={item.disease.id}
                  style={styles.diffItem}
                  activeOpacity={0.7}
                  onPress={() => openDiseaseDetail(item.disease)}
                >
                  <View>
                    <Text style={styles.diffName}>{item.disease.name}</Text>
                    <Text style={styles.diffSub}>{item.matchedRules.length} gejala terindikasi</Text>
                  </View>
                  <View style={styles.diffBadge}>
                    <Text style={styles.diffBadgeText}>{item.percentage}%</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Matched Symptoms Detail */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="checkmark-done-circle-outline" size={18} color={COLORS.brand} />
            <Text style={styles.cardTitle}>Gejala Teridentifikasi pada Penyakit Ini</Text>
          </View>
          <View style={styles.symptomsDetailList}>
            {primary.matchedRules.map((rule, idx) => (
              <View key={idx} style={styles.symptomDetailRow}>
                <Text style={styles.symptomDetailName}>
                  {rule.symptomId} (CF User: {rule.cfUser})
                </Text>
                <View style={styles.cfCalcBadge}>
                  <Text style={styles.cfCalcText}>CF: {rule.cfCalculated.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Recommendations */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="clipboard-outline" size={18} color={COLORS.brand} />
            <Text style={styles.cardTitle}>Protokol Tindakan & Penanganan Cepat</Text>
          </View>
          <View style={styles.recList}>
            <Text style={styles.recItem}>• <Text style={styles.boldText}>Tindakan darurat:</Text> {primary.disease.treatment}</Text>
            <Text style={styles.recItem}>• <Text style={styles.boldText}>Biosekuriti lingkungan:</Text> {primary.disease.prevention}</Text>
            <Text style={styles.recItem}>• Segera pisahkan ayam dengan gejala terberat ke kandang karantina isolasi.</Text>
            <Text style={styles.recItem}>• Disinfeksi tandon air minum, bersihkan nipple line, dan ganti sekam lembap.</Text>
          </View>
        </View>

        {/* Medical Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="warning-outline" size={20} color={COLORS.warning} />
          <Text style={styles.disclaimerText}>
            <Text style={styles.boldText}>Perhatian Klinis: </Text>
            Hasil diagnosis AyamCare berbasis inferensi komputer Certainty Factor. Untuk konfirmasi pasti dan pemberian antibiotik keras berjadwal, selalu konsultasikan dengan dokter hewan atau dinas peternakan setempat.
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionCol}>
          <TouchableOpacity
            style={styles.repeatBtn}
            activeOpacity={0.85}
            onPress={() => setActiveScreen('diagnosis_symptoms')}
          >
            <Ionicons name="refresh-outline" size={18} color={COLORS.surface} />
            <Text style={styles.repeatBtnText}>Ulangi Sesi Diagnosis Baru</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => {
              setActiveTab('beranda');
              setActiveScreen('main');
            }}
          >
            <Text style={styles.backHomeBtnText}>Kembali ke Beranda</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line
  },
  headerBtn: {
    padding: 4
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: 0.5
  },
  scroll: {
    padding: 16,
    gap: 14,
    paddingBottom: 40
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 18
  },
  primaryBtn: {
    backgroundColor: COLORS.brand,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8
  },
  primaryBtnText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 13
  },
  primaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    gap: 12,
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  primaryTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 6
  },
  matchBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.brand,
    letterSpacing: 0.5
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink
  },
  diseaseLatin: {
    fontSize: 11,
    fontStyle: 'italic',
    color: COLORS.muted,
    marginTop: 2
  },
  pctWrap: {
    alignItems: 'flex-end'
  },
  pctText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.brand
  },
  pctSub: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.muted
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.brand,
    borderRadius: 4
  },
  primaryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 10
  },
  footerRule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  footerRuleText: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '500'
  },
  footerCount: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 10
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accordionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 8,
    gap: 6
  },
  formulaText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.muted
  },
  stepsBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 4
  },
  stepLine: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.ink
  },
  stepFinal: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: COLORS.brand,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 4
  },
  section: {
    gap: 6
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.muted,
    letterSpacing: 0.5
  },
  diffList: {
    gap: 8
  },
  diffItem: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  diffName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  diffSub: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2
  },
  diffBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  diffBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.brand
  },
  symptomsDetailList: {
    gap: 6
  },
  symptomDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  symptomDetailName: {
    fontSize: 11,
    color: COLORS.ink,
    flex: 1
  },
  cfCalcBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  cfCalcText: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: COLORS.brand
  },
  recList: {
    gap: 6
  },
  recItem: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.ink
  },
  disclaimerBox: {
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start'
  },
  disclaimerText: {
    flex: 1,
    fontSize: 10,
    color: '#92400E',
    lineHeight: 15
  },
  actionCol: {
    gap: 8,
    marginTop: 4
  },
  repeatBtn: {
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8
  },
  repeatBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.surface
  },
  backHomeBtn: {
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  backHomeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.ink
  }
});

