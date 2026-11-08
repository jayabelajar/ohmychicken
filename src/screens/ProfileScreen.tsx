import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES, SYMPTOMS } from '../data/knowledgeBase';

export const ProfileScreen: React.FC = () => {
  const user = useDiagnosisStore((s) => s.user);
  const history = useDiagnosisStore((s) => s.history);
  const logout = useDiagnosisStore((s) => s.logout);
  const resetAll = useDiagnosisStore((s) => s.resetAll);
  const setActiveScreen = useDiagnosisStore((s) => s.setActiveScreen);

  const handleLogout = () => {
    Alert.alert(
      'Keluar Akun',
      'Apakah Anda ingin keluar dari akun ini? Anda dapat masuk kembali kapan saja.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Sistem Aplikasi',
      'Apakah Anda ingin mereset seluruh data sesi, riwayat diagnosis lokal, dan mengulang layar onboarding?',
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
      <Header title="Profil Peternak" subtitle="Kelola Akun & Basis Pengetahuan" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={32} color="#0284C7" />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{user?.name || 'Peternak Broiler'}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#0284C7" />
                <Text style={styles.verifiedText}>Terverifikasi</Text>
              </View>
            </View>
            <Text style={styles.farmName}>🏠 {user?.farmName || 'Peternakan Broiler Mandiri'}</Text>
            <Text style={styles.userEmail}>✉️ {user?.email || 'peternak@ayamcare.id'}</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>Diagnosis Selesai</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' }]}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Offline Ready</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
            <Text style={styles.statNumber}>v1.0</Text>
            <Text style={styles.statLabel}>Versi Mesin CF</Text>
          </View>
        </View>

        {/* System Specs Bento */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spesifikasi Mesin Inferensi</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.specItem}>
            <View style={styles.specIconWrap}>
              <Ionicons name="calculator-outline" size={18} color="#0284C7" />
            </View>
            <View style={styles.specDetails}>
              <Text style={styles.specTitle}>Metode Certainty Factor</Text>
              <Text style={styles.specDesc}>Formula Shortliffe & Buchanan (CF kombinasi)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.specItem}>
            <View style={styles.specIconWrap}>
              <Ionicons name="medkit-outline" size={18} color="#8B5CF6" />
            </View>
            <View style={styles.specDetails}>
              <Text style={styles.specTitle}>{DISEASES.length} Patologi Broiler</Text>
              <Text style={styles.specDesc}>ND, IBD/Gumboro, AI, CRD, Kolera, Asites, dll.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.specItem}>
            <View style={styles.specIconWrap}>
              <Ionicons name="list-outline" size={18} color="#F59E0B" />
            </View>
            <View style={styles.specDetails}>
              <Text style={styles.specTitle}>{SYMPTOMS.length} Indikator Gejala</Text>
              <Text style={styles.specDesc}>Fisik, pernapasan, pencernaan, & perilaku</Text>
            </View>
          </View>
        </View>

        {/* Scientific Paper Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rujukan Ilmiah Primer</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.paperBadge}>
            <Ionicons name="school" size={13} color="#0284C7" />
            <Text style={styles.paperBadgeText}>Jurnal Algoritma ITG (2024)</Text>
          </View>
          <Text style={styles.paperTitle}>
            "Implementasi Metode Certainty Faktor Pada Sistem Diagnosa Penyakit Ayam Pedaging (Broiler)"
          </Text>
          <Text style={styles.paperAuthors}>Penulis: Y. Agustin, F. Mulyani, & D. Sopandi</Text>
          <Text style={styles.paperVolume}>Vol. 21 No. 2 (2024), Hal. 332-342</Text>

          <TouchableOpacity style={styles.doiBtn} activeOpacity={0.8} onPress={handleOpenDOI}>
            <Text style={styles.doiBtnText}>Akses Publikasi DOI Jurnal</Text>
            <Ionicons name="open-outline" size={15} color="#0284C7" />
          </TouchableOpacity>
        </View>

        {/* Actions & Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pengaturan Akun & Data</Text>
        </View>

        <View style={styles.actionCard}>
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={() => setActiveScreen('auth')}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="swap-horizontal-outline" size={20} color="#475569" />
              <Text style={styles.actionText}>Ganti / Beralih Akun</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={[styles.actionText, { color: '#EF4444' }]}>Keluar Akun</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={handleReset}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="refresh-circle-outline" size={20} color="#EF4444" />
              <Text style={[styles.actionText, { color: '#EF4444' }]}>
                Reset Seluruh Data & Onboarding
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            AyamCare Broiler v1.0.0 • Sistem Pakar Offline
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20
  },
  userCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInfo: {
    flex: 1
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A'
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7'
  },
  farmName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 2
  },
  userEmail: {
    fontSize: 11,
    color: '#64748B'
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  statBox: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 2
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center'
  },
  sectionHeader: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  specIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  specDetails: {
    flex: 1
  },
  specTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  specDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12
  },
  paperBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E0F2FE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8
  },
  paperBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7'
  },
  paperTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 18,
    marginBottom: 6
  },
  paperAuthors: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 2
  },
  paperVolume: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 12
  },
  doiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 14,
    paddingVertical: 10,
    gap: 8
  },
  doiBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7'
  },
  actionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B'
  },
  footerNote: {
    alignItems: 'center',
    marginVertical: 10
  },
  footerNoteText: {
    fontSize: 11,
    color: '#94A3B8'
  }
});

