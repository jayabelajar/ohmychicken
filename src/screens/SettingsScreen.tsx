import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES, SYMPTOMS } from '../data/knowledgeBase';

export const SettingsScreen: React.FC = () => {
  const resetAll = useDiagnosisStore((s) => s.resetAll);

  const handleReset = () => {
    Alert.alert(
      'Reset Aplikasi',
      'Apakah Anda ingin mereset seluruh data lokal, riwayat, dan mengulang layar onboarding?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Reset Sekarang', style: 'destructive', onPress: resetAll }
      ]
    );
  };

  const handleOpenDOI = () => {
    Linking.openURL('https://doi.org/10.33364/algoritma/v.21-2.1526');
  };

  return (
    <View style={styles.container}>
      <Header title="Pengaturan & Info" subtitle="Spesifikasi Sistem Pakar" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* App Specification Card */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>AC</Text>
            </View>
            <View>
              <Text style={styles.appName}>AyamCare Broiler Mobile</Text>
              <Text style={styles.appVer}>v1.0.0 — Offline-First Architecture</Text>
            </View>
          </View>

          <View style={styles.specList}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Metode Inferensi</Text>
              <Text style={styles.specVal}>Certainty Factor (Shortliffe)</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Basis Pengetahuan</Text>
              <Text style={styles.specVal}>KB-AGUSTIN-2024</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Jumlah Penyakit</Text>
              <Text style={styles.specVal}>{DISEASES.length} Patologi Broiler</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Indikator Gejala</Text>
              <Text style={styles.specVal}>{SYMPTOMS.length} Gejala Klinis</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Penyimpanan</Text>
              <Text style={styles.specVal}>Offline SQLite / Local Storage</Text>
            </View>
          </View>
        </View>

        {/* Scientific Foundation */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="school-outline" size={18} color={COLORS.brand} />
            <Text style={styles.cardTitle}>Sumber Penelitian Primer</Text>
          </View>
          <Text style={styles.paperAuthors}>Agustin, Mulyani & Sopandi (2024)</Text>
          <Text style={styles.paperTitle}>
            "Implementasi Metode Certainty Faktor Pada Sistem Diagnosa Penyakit Ayam Pedaging (Broiler)"
          </Text>
          <Text style={styles.paperJournal}>
            Jurnal Algoritma, Institut Teknologi Garut, Vol. 21 No. 2, Hal. 332-342.
          </Text>

          <TouchableOpacity style={styles.doiBtn} activeOpacity={0.8} onPress={handleOpenDOI}>
            <Text style={styles.doiBtnText}>Buka Tautan DOI Jurnal</Text>
            <Ionicons name="open-outline" size={14} color={COLORS.brand} />
          </TouchableOpacity>
        </View>

        {/* Data Management Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="construct-outline" size={18} color={COLORS.brand} />
            <Text style={styles.cardTitle}>Manajemen Data Aplikasi</Text>
          </View>
          <Text style={styles.resetDesc}>
            Bersihkan seluruh memori sesi, riwayat diagnosis lokal, dan mulai ulang dari onboarding.
          </Text>
          <TouchableOpacity style={styles.resetBtn} activeOpacity={0.85} onPress={handleReset}>
            <Ionicons name="refresh-outline" size={16} color={COLORS.danger} />
            <Text style={styles.resetBtnText}>Reset Data & Onboarding</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <View style={styles.disclaimerTitleRow}>
            <Ionicons name="shield-checkmark" size={16} color={COLORS.brand} />
            <Text style={styles.disclaimerTitle}>Pernyataan Keamanan Veteriner</Text>
          </View>
          <Text style={styles.disclaimerText}>
            Aplikasi ini tidak menggantikan pemeriksaan nekropsi patologi veteriner atau pengujian mikrobiologis langsung oleh dokter hewan. Gunakan rekomendasi sebagai tindakan awal pendukung di kandang.
          </Text>
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
  scroll: {
    padding: 16,
    gap: 12,
    paddingBottom: 40
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 12
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appIconText: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '800'
  },
  appName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink
  },
  appVer: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2
  },
  specList: {
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 10,
    gap: 8
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  specLabel: {
    fontSize: 11,
    color: COLORS.muted
  },
  specVal: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.ink
  },
  paperAuthors: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink
  },
  paperTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: COLORS.ink,
    lineHeight: 16
  },
  paperJournal: {
    fontSize: 11,
    color: COLORS.muted
  },
  doiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 4
  },
  doiBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  },
  resetDesc: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.danger
  },
  disclaimerCard: {
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 6
  },
  disclaimerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  disclaimerTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.ink
  },
  disclaimerText: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16
  }
});

