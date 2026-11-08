import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES, DIAGNOSTIC_RULES } from '../data/knowledgeBase';

export const DiseaseCatalogScreen: React.FC = () => {
  const openDiseaseDetail = useDiagnosisStore((s) => s.openDiseaseDetail);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = useMemo(() => {
    if (!searchQuery.trim()) return DISEASES;
    const q = searchQuery.toLowerCase().trim();
    return DISEASES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.latinName.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Header title="Katalog Penyakit" subtitle="13 Patologi Broiler Terdata" />

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari penyakit (contoh: Tetelo, CRD, P01)..."
            placeholderTextColor={COLORS.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={COLORS.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredDiseases.map((disease) => {
          const ruleCount = DIAGNOSTIC_RULES.filter((r) => r.diseaseId === disease.id).length;
          const isHighRisk = disease.riskLevel === 'KRITIS' || disease.riskLevel === 'TINGGI';

          return (
            <TouchableOpacity
              key={disease.id}
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => openDiseaseDetail(disease)}
            >
              <View style={styles.cardTop}>
                <View style={styles.headerLeft}>
                  <View style={styles.badgeRow}>
                    <View style={styles.codeBadge}>
                      <Text style={styles.codeText}>{disease.code}</Text>
                    </View>
                    <View style={[styles.riskBadge, isHighRisk ? styles.riskHigh : styles.riskMedium]}>
                      <Text style={[styles.riskText, isHighRisk ? styles.riskTextHigh : styles.riskTextMedium]}>
                        {disease.riskLevel}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <Text style={styles.diseaseLatin}>{disease.latinName}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
              </View>

              <Text style={styles.description} numberOfLines={2}>
                {disease.description}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.ruleBadgeText}>{ruleCount} Aturan Gejala</Text>
                <Text style={styles.viewDetailText}>Lihat Panduan &rarr;</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.canvas,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.ink,
    padding: 0
  },
  scroll: {
    padding: 16,
    gap: 12,
    paddingBottom: 40
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  headerLeft: {
    flex: 1,
    gap: 3
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
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
  diseaseName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink
  },
  diseaseLatin: {
    fontSize: 11,
    fontStyle: 'italic',
    color: COLORS.muted
  },
  description: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 8
  },
  ruleBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.muted
  },
  viewDetailText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  }
});

