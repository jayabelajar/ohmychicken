import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView
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
    <SafeAreaView style={styles.safe}>
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, isSelected && styles.pillActive]}
                onPress={() => setSelectedCategory(cat)}
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
                activeOpacity={0.7}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <Ionicons name="checkmark" size={14} color={COLORS.surface} />}
                </View>

                <View style={styles.symptomInfo}>
                  <View style={styles.symptomNameRow}>
                    <Text style={[styles.symptomName, isChecked && styles.symptomNameActive]}>
                      {symptom.name}
                    </Text>
                    <View style={styles.codeBadge}>
                      <Text style={styles.codeText}>{symptom.code}</Text>
                    </View>
                  </View>
                  <Text style={styles.symptomDesc}>{symptom.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.counterText}>{selectedSymptoms.length} gejala dipilih</Text>
          <Text style={styles.counterSub}>Minimal 2 gejala untuk inferensi</Text>
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, !canProceed && styles.nextBtnDisabled]}
          disabled={!canProceed}
          activeOpacity={0.85}
          onPress={() => setActiveScreen('diagnosis_confidence')}
        >
          <Text style={[styles.nextBtnText, !canProceed && styles.nextBtnTextDisabled]}>Lanjutkan</Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={canProceed ? COLORS.surface : COLORS.muted}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface
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
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger
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
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: COLORS.line,
    width: '100%'
  },
  progressBarFill: {
    height: 3,
    backgroundColor: COLORS.brand
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
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
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
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
  pillRow: {
    gap: 8,
    paddingVertical: 2
  },
  pill: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  pillActive: {
    backgroundColor: COLORS.brand,
    borderColor: COLORS.brand
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.muted
  },
  pillTextActive: {
    color: COLORS.surface,
    fontWeight: '700'
  },
  list: {
    gap: 8
  },
  symptomItem: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  symptomItemActive: {
    backgroundColor: '#EFF6FF',
    borderColor: COLORS.brand
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    backgroundColor: COLORS.surface,
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
  symptomNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6
  },
  symptomName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink,
    flex: 1
  },
  symptomNameActive: {
    color: COLORS.brand
  },
  codeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  codeText: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: COLORS.muted
  },
  symptomDesc: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 15
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 10
  },
  counterText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.brand
  },
  counterSub: {
    fontSize: 10,
    color: COLORS.muted
  },
  nextBtn: {
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6
  },
  nextBtnDisabled: {
    backgroundColor: '#E2E8F0'
  },
  nextBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.surface
  },
  nextBtnTextDisabled: {
    color: COLORS.muted
  }
});

