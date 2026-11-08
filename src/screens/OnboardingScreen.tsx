import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

const SLIDES = [
  {
    tag: 'SISTEM PAKAR BROILER',
    title: 'Deteksi Dini Kesehatan Broiler Anda',
    description:
      'Identifikasi gejala klinis ayam secara cepat dan akurat menggunakan mesin inferensi berbasis bukti pakar ternak.',
    icon: 'medkit' as const,
    cardBg: '#EFF6FF',
    iconColor: COLORS.brand,
    features: ['13 Penyakit Terdata', '40 Indikator Gejala', 'Solusi Tindakan Cepat']
  },
  {
    tag: 'METODE ILMIAH SHORTLIFFE',
    title: 'Perhitungan Certainty Factor (CF)',
    description:
      'Skor kepastian dihasilkan dari kombinasi derajat keyakinan peternak dan bobot pakar (MB - MD) secara deterministik.',
    icon: 'analytics' as const,
    cardBg: '#EFF6FF',
    iconColor: COLORS.brandDark,
    features: ['Bobot Pakar Jurnal 2024', 'Diferensial Diagnosis', 'Langkah Hitung Transparan']
  },
  {
    tag: 'ARSITEKTUR OFFLINE-FIRST',
    title: '100% Bekerja Tanpa Internet',
    description:
      'Akses basis pengetahuan dan riwayat diagnosis langsung di area perkandangan tanpa perlu sinyal maupun paket data.',
    icon: 'cloud-offline' as const,
    cardBg: '#EFF6FF',
    iconColor: COLORS.brandAccent,
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

  const handleSkip = () => {
    finishOnboarding();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.brandBadge}>
          <Ionicons name="pulse" size={14} color={COLORS.brand} />
          <Text style={styles.brandBadgeText}>AyamCare Broiler</Text>
        </View>
        {!isLast && (
          <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.skipText}>Lewati</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Illustration Circle (Matching Reference Image 1) */}
      <View style={styles.heroWrap}>
        <View style={[styles.heroCircle, { backgroundColor: slide.cardBg }]}>
          <View style={styles.iconCircle}>
            <Ionicons name={slide.icon} size={54} color={slide.iconColor} />
          </View>
        </View>

        {/* Feature Pills under hero */}
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
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvas,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bentoBlue,
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  brandBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.brandDark
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted
  },
  heroWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  heroCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.bentoBlueBorder,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    maxWidth: 320
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  pillBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.ink
  },
  contentWrap: {
    gap: 10,
    alignItems: 'center'
  },
  tagWrap: {
    backgroundColor: COLORS.bentoBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  titleText: {
    fontSize: 21,
    fontWeight: '900',
    color: COLORS.ink,
    textAlign: 'center',
    lineHeight: 27
  },
  descText: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10
  },
  dotRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1'
  },
  dotActive: {
    width: 20,
    borderRadius: 4
  },
  ctaButton: {
    backgroundColor: COLORS.brandNavy,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});
