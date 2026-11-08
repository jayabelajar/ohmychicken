import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { SYMPTOMS, CF_USER_SCALES } from '../data/knowledgeBase';

export const ConfidencePickerScreen: React.FC = () => {
  const selectedSymptoms = useDiagnosisStore((s) => s.selectedSymptoms);
  const confidenceValues = useDiagnosisStore((s) => s.confidenceValues);
  const setSymptomConfidence = useDiagnosisStore((s) => s.setSymptomConfidence);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const calculateResult = useDiagnosisStore((s) => s.calculateResult);

  const selectedSymptomData = selectedSymptoms
    .map((id) => SYMPTOMS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <View style={styles.container}>
      {/* Top Wizard Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveScreen('diagnosis_symptoms')}>
          <Ionicons name="chevron-back" size={20} color={COLORS.ink} />
          <Text style={styles.headerBtnText}>Kembali</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.stepBadge}>LANGKAH 2 DARI 2</Text>
          <Text style={styles.headerTitle}>Skala Keyakinan Peternak</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: '100%' }]} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headline}>
          <Text style={styles.headlineTitle}>Seberapa yakin observasi Anda?</Text>
          <Text style={styles.headlineDesc}>
            Pilih tingkat kepastian Anda untuk setiap gejala yang dicentang di kandang.
          </Text>
        </View>

        <View style={styles.list}>
          {selectedSymptomData.map((symptom) => {
            if (!symptom) return null;
            const currentVal = confidenceValues[symptom.id] ?? 0.8;

            return (
              <View key={symptom.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleWrap}>
                    <Text style={styles.categoryLabel}>{symptom.category}</Text>
                    <Text style={styles.symptomTitle}>{symptom.name}</Text>
                  </View>
                  <View style={styles.codeBadge}>
                    <Text style={styles.codeText}>{symptom.code}</Text>
                  </View>
                </View>

                {/* 4-tier CF selector */}
                <View style={styles.scaleGrid}>
                  {CF_USER_SCALES.map((scale) => {
                    const isSelected = currentVal === scale.value;
                    return (
                      <TouchableOpacity
                        key={scale.value}
                        style={[styles.scaleBtn, isSelected && styles.scaleBtnActive]}
                        activeOpacity={0.8}
                        onPress={() => setSymptomConfidence(symptom.id, scale.value)}
                      >
                        <Text style={[styles.scaleLabel, isSelected && styles.scaleLabelActive]}>
                          {scale.label}
                        </Text>
                        <Text style={[styles.scaleValue, isSelected && styles.scaleValueActive]}>
                          CF {scale.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Responsive Bottom Action Bar (Normal flow, never covered by Android 3 buttons) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.modifyBtn}
          onPress={() => setActiveScreen('diagnosis_symptoms')}
        >
          <Text style={styles.modifyBtnText}>Ubah Gejala</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calcBtn} activeOpacity={0.85} onPress={calculateResult}>
          <Ionicons name="calculator" size={17} color="#FFFFFF" />
          <Text style={styles.calcBtnText}>Hitung Diagnosis CF</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4
  },
  headerBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.ink,
    marginLeft: 2
  },
  headerCenter: {
    alignItems: 'center'
  },
  stepBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.brand,
    letterSpacing: 0.5
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: '#E2E8F0'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.brand
  },
  scrollArea: {
    flex: 1
  },
  scroll: {
    padding: 16,
    paddingBottom: 24,
    gap: 14
  },
  headline: {
    gap: 2
  },
  headlineTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink
  },
  headlineDesc: {
    fontSize: 11.5,
    color: COLORS.muted,
    lineHeight: 16
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10
  },
  cardTitleWrap: {
    flex: 1
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.brand,
    textTransform: 'uppercase',
    marginBottom: 2
  },
  symptomTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink
  },
  codeBadge: {
    backgroundColor: COLORS.bentoBlue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  codeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.brandDark
  },
  scaleGrid: {
    flexDirection: 'row',
    gap: 6
  },
  scaleBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.line
  },
  scaleBtnActive: {
    backgroundColor: COLORS.brandNavy,
    borderColor: COLORS.brandNavy
  },
  scaleLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.ink
  },
  scaleLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  scaleValue: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2
  },
  scaleValueActive: {
    color: '#93C5FD'
  },
  bottomBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8
  },
  modifyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  modifyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.inkSecondary
  },
  calcBtn: {
    flex: 1,
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 14,
    gap: 6,
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  calcBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
