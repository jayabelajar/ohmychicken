import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    tag: 'SISTEM PAKAR BROILER',
    title: 'Deteksi Dini Kesehatan Broiler Anda',
    description:
      'Identifikasi gejala klinis ayam secara cepat dan akurat menggunakan mesin inferensi berbasis bukti pakar ternak.',
    icon: 'medkit',
    cardBg: '#EFF6FF',
    iconColor: '#2563EB',
    features: ['13 Penyakit Terdata', '40 Indikator Gejala', 'Solusi Tindakan Cepat']
  },
  {
    tag: 'METODE ILMIAH SHORTLIFFE',
    title: 'Perhitungan Certainty Factor (CF)',
    description:
      'Skor kepastian dihasilkan dari kombinasi derajat keyakinan peternak dan bobot pakar (MB - MD) secara deterministik.',
    icon: 'analytics',
    cardBg: '#F5F3FF',
    iconColor: '#7C3AED',
    features: ['Bobot Pakar Jurnal 2024', 'Diferensial Diagnosis', 'Langkah Hitung Transparan']
  },
  {
    tag: 'ARSITEKTUR OFFLINE-FIRST',
    title: '100% Bekerja Tanpa Internet',
    description:
      'Akses basis pengetahuan dan riwayat diagnosis langsung di area perkandangan tanpa perlu sinyal maupun paket data.',
    icon: 'cloud-offline',
    cardBg: '#ECFDF5',
    iconColor: '#059669',
    features: ['Penyimpanan Lokal Aman', 'Riwayat per Peternak', 'Ringan & Responsif']
  }
];

export const OnboardingScreen: React.FC = () => {
  const finishOnboarding = useDiagnosisStore((s) => s.finishOnboarding);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = SLIDES[currentSlide];
  const isLast = currentSlide === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      finishOnboarding();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top App Identity */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="pulse" size={16} color={COLORS.surface} />
            </View>
            <Text style={styles.logoText}>AyamCare</Text>
          </View>
          <TouchableOpacity onPress={finishOnboarding}>
            <Text style={styles.skipText}>Lewati</Text>
          </TouchableOpacity>
        </View>

        {/* Center Illustration Hero Card (Matching Reference Style) */}
        <View style={[styles.heroCard, { backgroundColor: slide.cardBg }]}>
          <View style={[styles.heroCircle, { backgroundColor: slide.iconColor }]}>
            <Ionicons name={slide.icon as any} size={48} color={COLORS.surface} />
          </View>

          {/* Feature Badges in Card */}
          <View style={styles.badgeWrap}>
            {slide.features.map((feat, i) => (
              <View key={i} style={styles.pillBadge}>
                <Ionicons name="checkmark-circle" size={12} color={slide.iconColor} />
                <Text style={styles.pillBadgeText}>{feat}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Content Area */}
        <View style={styles.contentWrap}>
          {/* Tag */}
          <View style={styles.tagWrap}>
            <Text style={[styles.tagText, { color: slide.iconColor }]}>{slide.tag}</Text>
          </View>

          {/* Headline Title */}
          <Text style={styles.titleText}>{slide.title}</Text>
          <Text style={styles.descText}>{slide.description}</Text>

          {/* Pagination Dots */}
          <View style={styles.dotRow}>
            {SLIDES.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === currentSlide && [styles.dotActive, { backgroundColor: slide.iconColor }]
                ]}
              />
            ))}
          </View>

          {/* Pill CTA Button (Matching Reference Image) */}
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={styles.ctaText}>
              {isLast ? 'Mulai Sekarang' : 'Lanjutkan'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.surface} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3
  },
  skipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted
  },
  heroCard: {
    width: '100%',
    height: width * 0.76,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2
  },
  heroCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.inkSecondary
  },
  contentWrap: {
    gap: 8,
    paddingTop: 8
  },
  tagWrap: {
    alignSelf: 'flex-start'
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 30,
    letterSpacing: -0.4
  },
  descText: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 18,
    marginTop: 2
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1'
  },
  dotActive: {
    width: 22,
    borderRadius: 4
  },
  ctaButton: {
    backgroundColor: '#1E293B', // Reference image style: dark modern pill
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  ctaText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '700'
  }
});
