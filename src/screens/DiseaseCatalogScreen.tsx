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

      {/* Modern Search Bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari penyakit (contoh: Tetelo, CRD, P01)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>Menampilkan {filteredDiseases.length} dari 13 Penyakit</Text>
        </View>

        {filteredDiseases.map((disease) => {
          const ruleCount = DIAGNOSTIC_RULES.filter((r) => r.diseaseId === disease.id).length;
          const isHighRisk = disease.riskLevel === 'KRITIS' || disease.riskLevel === 'TINGGI';

          return (
            <TouchableOpacity
              key={disease.id}
              style={styles.card}
              activeOpacity={0.8}
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
                        Tingkat Risiko: {disease.riskLevel}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <Text style={styles.diseaseLatin}>{disease.latinName}</Text>
                </View>
                <View style={styles.chevronWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#0284C7" />
                </View>
              </View>

              <Text style={styles.description} numberOfLines={2}>
                {disease.description}
              </Text>

              <View style={styles.cardFooter}>
                <View style={styles.ruleBadge}>
                  <Ionicons name="fitness-outline" size={13} color="#0284C7" />
                  <Text style={styles.ruleBadgeText}>{ruleCount} Gejala Karakteristik</Text>
                </View>
                <Text style={styles.viewDetailText}>Lihat Solusi &rarr;</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    padding: 0
  },
  countRow: {
    marginBottom: 4
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B'
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 115,
    gap: 12
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10
  },
  headerLeft: {
    flex: 1
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6
  },
  codeBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0369A1'
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  riskHigh: {
    backgroundColor: '#FEE2E2'
  },
  riskMedium: {
    backgroundColor: '#FEF3C7'
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700'
  },
  riskTextHigh: {
    color: '#B91C1C'
  },
  riskTextMedium: {
    color: '#B45309'
  },
  diseaseName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2
  },
  diseaseLatin: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#64748B'
  },
  description: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  ruleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  ruleBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7'
  },
  viewDetailText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7'
  }
});
