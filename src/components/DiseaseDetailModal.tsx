import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { DIAGNOSTIC_RULES, SYMPTOMS } from '../data/knowledgeBase';

export const DiseaseDetailModal: React.FC = () => {
  const selectedDisease = useDiagnosisStore((s) => s.selectedDiseaseDetail);
  const closeDiseaseDetail = useDiagnosisStore((s) => s.closeDiseaseDetail);

  if (!selectedDisease) return null;

  const rules = DIAGNOSTIC_RULES.filter((r) => r.diseaseId === selectedDisease.id);
  const isHighRisk = selectedDisease.riskLevel === 'KRITIS' || selectedDisease.riskLevel === 'TINGGI';

  return (
    <Modal visible={true} transparent={true} animationType="slide" onRequestClose={closeDiseaseDetail}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <View style={styles.badgeRow}>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>{selectedDisease.code}</Text>
                </View>
                <View style={[styles.riskBadge, isHighRisk ? styles.riskHigh : styles.riskMedium]}>
                  <Text style={[styles.riskText, isHighRisk ? styles.riskTextHigh : styles.riskTextMedium]}>
                    {selectedDisease.riskLevel}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>{selectedDisease.name}</Text>
              <Text style={styles.latin}>{selectedDisease.latinName}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={closeDiseaseDetail}>
              <Ionicons name="close" size={20} color={COLORS.ink} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            {/* Description & Causes */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="document-text-outline" size={16} color={COLORS.brand} />
                <Text style={styles.sectionTitle}>Deskripsi & Etiologi Patogen</Text>
              </View>
              <Text style={styles.sectionText}>{selectedDisease.description}</Text>
              <Text style={[styles.sectionText, { marginTop: 4 }]}>
                <Text style={styles.bold}>Penyebab: </Text>
                {selectedDisease.causes}
              </Text>
            </View>

            {/* Characteristic Symptoms */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="list-outline" size={16} color={COLORS.brand} />
                <Text style={styles.sectionTitle}>Gejala Karakteristik (Tabel Jurnal)</Text>
              </View>
              <View style={styles.symptomList}>
                {rules.map((rule) => {
                  const s = SYMPTOMS.find((x) => x.id === rule.symptomId);
                  return (
                    <View key={rule.id} style={styles.symptomRow}>
                      <Text style={styles.symptomName}>• {s ? s.name : rule.symptomId}</Text>
                      <View style={styles.cfBadge}>
                        <Text style={styles.cfBadgeText}>CF Pakar: {rule.cfExpert}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Prevention */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="shield-outline" size={16} color={COLORS.brand} />
                <Text style={styles.sectionTitle}>Tindakan Pencegahan Biosekuriti</Text>
              </View>
              <Text style={styles.sectionText}>{selectedDisease.prevention}</Text>
            </View>

            {/* Treatment */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="medkit-outline" size={16} color={COLORS.brand} />
                <Text style={styles.sectionTitle}>Penanganan Medis Awal</Text>
              </View>
              <Text style={styles.sectionText}>{selectedDisease.treatment}</Text>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.confirmBtn} onPress={closeDiseaseDetail}>
              <Text style={styles.confirmBtnText}>Tutup Informasi</Text>
            </TouchableOpacity>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  codeBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  codeText: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '800',
    color: COLORS.brand
  },
  riskBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  riskHigh: {
    backgroundColor: '#FEF2F2'
  },
  riskMedium: {
    backgroundColor: '#FEF3C7'
  },
  riskText: {
    fontSize: 9,
    fontWeight: '800'
  },
  riskTextHigh: {
    color: COLORS.danger
  },
  riskTextMedium: {
    color: COLORS.warning
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink
  },
  latin: {
    fontSize: 11,
    fontStyle: 'italic',
    color: COLORS.muted
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
    gap: 16
  },
  section: {
    gap: 6
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  sectionText: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 17
  },
  bold: {
    fontWeight: '700',
    color: COLORS.ink
  },
  symptomList: {
    gap: 6,
    marginTop: 2
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8
  },
  symptomName: {
    fontSize: 11,
    color: COLORS.ink,
    flex: 1
  },
  cfBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  cfBadgeText: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: COLORS.brand
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    backgroundColor: COLORS.canvas
  },
  confirmBtn: {
    backgroundColor: COLORS.brand,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  confirmBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.surface
  }
});

