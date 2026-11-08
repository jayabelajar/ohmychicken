import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { RESEARCH_SAMPLES, SYMPTOMS } from '../data/knowledgeBase';

export const ResearchBenchModal: React.FC = () => {
  const isOpen = useDiagnosisStore((s) => s.isTestBenchOpen);
  const closeTestBench = useDiagnosisStore((s) => s.closeTestBench);
  const runTestSample = useDiagnosisStore((s) => s.runTestSample);

  if (!isOpen) return null;

  return (
    <Modal visible={true} transparent={true} animationType="slide" onRequestClose={closeTestBench}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.titleRow}>
                <Ionicons name="flask" size={18} color={COLORS.brand} />
                <Text style={styles.title}>Validasi 10 Sampel Jurnal</Text>
              </View>
              <Text style={styles.subtitle}>Pilih sampel uji Tabel 6 untuk simulasi otomatis</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={closeTestBench}>
              <Ionicons name="close" size={20} color={COLORS.ink} />
            </TouchableOpacity>
          </View>

          {/* List of 10 samples */}
          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            {RESEARCH_SAMPLES.map((sample) => {
              const isMismatch = sample.match.includes('Diskrepansi');
              const symptomNames = sample.symptoms.map((sId) => {
                const s = SYMPTOMS.find((x) => x.id === sId);
                return s ? s.name : sId;
              });

              return (
                <View key={sample.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.sampleBadge}>
                      <Text style={styles.sampleBadgeText}>Sampel #{sample.id}</Text>
                    </View>
                    <View style={[styles.matchBadge, isMismatch ? styles.matchMismatch : styles.matchOk]}>
                      <Text style={[styles.matchText, isMismatch ? styles.matchTextMismatch : styles.matchTextOk]}>
                        {sample.match}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.targetText}>
                    Target Jurnal: <Text style={styles.bold}>{sample.expectedDisease}</Text> ({sample.expectedCF})
                  </Text>

                  <Text style={styles.symptomsText} numberOfLines={2}>
                    Gejala: {symptomNames.join(', ')}
                  </Text>

                  <TouchableOpacity
                    style={styles.runBtn}
                    activeOpacity={0.8}
                    onPress={() => runTestSample(sample.id)}
                  >
                    <Ionicons name="play" size={14} color={COLORS.brand} />
                    <Text style={styles.runBtnText}>Uji Kasus Ini Sekarang</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerNote}>
              Sumber: Tabel 6 Jurnal Algoritma 21(2), 332-342 (Agustin et al., 2024)
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.ink
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.canvas,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    padding: 16,
    gap: 12
  },
  card: {
    backgroundColor: COLORS.canvas,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 6
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sampleBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  sampleBadgeText: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: COLORS.brand
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12
  },
  matchOk: {
    backgroundColor: '#ECFDF5'
  },
  matchMismatch: {
    backgroundColor: '#FEF3C7'
  },
  matchText: {
    fontSize: 9,
    fontWeight: '700'
  },
  matchTextOk: {
    color: '#065F46'
  },
  matchTextMismatch: {
    color: '#92400E'
  },
  targetText: {
    fontSize: 12,
    color: COLORS.ink
  },
  bold: {
    fontWeight: '700'
  },
  symptomsText: {
    fontSize: 10,
    color: COLORS.muted,
    lineHeight: 14
  },
  runBtn: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginTop: 4
  },
  runBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    backgroundColor: COLORS.canvas,
    alignItems: 'center'
  },
  footerNote: {
    fontSize: 10,
    color: COLORS.muted
  }
});

