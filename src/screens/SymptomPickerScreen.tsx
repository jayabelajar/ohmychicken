import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { SYMPTOMS } from '../data/knowledgeBase';

export const SymptomPickerScreen: React.FC = () => {
  const selectedSymptoms = useDiagnosisStore((s) => s.selectedSymptoms);
  const toggleSymptom = useDiagnosisStore((s) => s.toggleSymptom);
  const clearSymptoms = useDiagnosisStore((s) => s.clearSymptoms);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);
  const selectedCategory = useDiagnosisStore((s) => s.selectedCategory);
  const setSelectedCategory = useDiagnosisStore((s) => s.setSelectedCategory);

  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['SEMUA', 'Pernapasan', 'Pencernaan', 'Saraf & Perilaku', 'Kepala & Fasial', 'Fisik & Performa'];

  const filteredSymptoms = useMemo(() => {
    let result = SYMPTOMS;
    if (selectedCategory !== 'SEMUA') {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const canProceed = selectedSymptoms.length >= 2;

  return (
    <View style={styles.container}>
      {/* Top Wizard Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveScreen('main')}>
          <Ionicons name="chevron-back" size={20} color={COLORS.ink} />
          <Text style={styles.headerBtnText}>Batal</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.stepBadge}>LANGKAH 1 DARI 2</Text>
          <Text style={styles.headerTitle}>Pemilihan Gejala Klinis</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn} onPress={clearSymptoms}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: '50%' }]} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Hint */}
        <View style={styles.headline}>
          <Text style={styles.headlineTitle}>Amati kondisi ayam di kandang</Text>
          <Text style={styles.headlineDesc}>
            Centang semua gejala fisik dan perilaku yang teramati pada kawanan broiler Anda.
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari gejala (contoh: ngorok, feses, napas)..."
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

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, isSelected && styles.pillActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Symptoms Checklist */}
        <View style={styles.list}>
          {filteredSymptoms.map((symptom) => {
            const isChecked = selectedSymptoms.includes(symptom.id);
            return (
              <TouchableOpacity
                key={symptom.id}
                style={[styles.symptomItem, isChecked && styles.symptomItemActive]}
                activeOpacity={0.75}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>

                <View style={styles.symptomInfo}>
                  <View style={styles.symptomMeta}>
                    <Text style={styles.symptomCode}>{symptom.code}</Text>
                    <Text style={styles.symptomCat}>• {symptom.category}</Text>
                  </View>
                  <Text style={[styles.symptomName, isChecked && styles.symptomNameActive]}>
                    {symptom.name}
                  </Text>
                  <Text style={styles.symptomDesc} numberOfLines={2}>
                    {symptom.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Responsive Bottom Floating Bar (Inside Safe Area Flow) */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeft}>
          <Text style={styles.counterText}>{selectedSymptoms.length} Gejala Dipilih</Text>
          <Text style={styles.counterSub}>
            {canProceed ? 'Siap melanjutkan' : 'Pilih minimal 2 gejala'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, !canProceed && styles.nextBtnDisabled]}
          disabled={!canProceed}
          activeOpacity={0.85}
          onPress={() => setActiveScreen('diagnosis_confidence')}
        >
          <Text style={[styles.nextBtnText, !canProceed && styles.nextBtnTextDisabled]}>
            Lanjut ke Bobot CF
          </Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={canProceed ? '#FFFFFF' : COLORS.muted}
          />
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
    minWidth: 50
  },
  headerBtnText: {
    fontSize: 12,
    color: COLORS.ink,
    fontWeight: '600'
  },
  resetText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: '700'
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
    gap: 12
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: COLORS.ink,
    padding: 0
  },
  pillRow: {
    gap: 6,
    paddingVertical: 4
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  pillActive: {
    backgroundColor: COLORS.brandNavy,
    borderColor: COLORS.brandNavy
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.muted
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  list: {
    gap: 10
  },
  symptomItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  symptomItemActive: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.bentoBlue
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  checkboxActive: {
    backgroundColor: COLORS.brand,
    borderColor: COLORS.brand
  },
  symptomInfo: {
    flex: 1
  },
  symptomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  },
  symptomCode: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.brandDark
  },
  symptomCat: {
    fontSize: 10,
    color: COLORS.muted
  },
  symptomName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink
  },
  symptomNameActive: {
    color: COLORS.brandDark
  },
  symptomDesc: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 15
  },
  bottomBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8
  },
  bottomLeft: {
    gap: 1
  },
  counterText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.brand
  },
  counterSub: {
    fontSize: 10,
    color: COLORS.muted
  },
  nextBtn: {
    backgroundColor: COLORS.brandNavy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 16,
    gap: 6
  },
  nextBtnDisabled: {
    backgroundColor: '#E2E8F0'
  },
  nextBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  nextBtnTextDisabled: {
    color: COLORS.muted
  }
});
