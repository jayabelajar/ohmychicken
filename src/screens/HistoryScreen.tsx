import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';
import { Header } from '../components/Header';
import { DISEASES } from '../data/knowledgeBase';

export const HistoryScreen: React.FC = () => {
  const history = useDiagnosisStore((s) => s.history);
  const clearHistory = useDiagnosisStore((s) => s.clearHistory);
  const openDiseaseDetail = useDiagnosisStore((s) => s.openDiseaseDetail);

  const handleClearHistory = () => {
    if (history.length === 0) return;
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus seluruh catatan diagnosis offline?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus Semua', style: 'destructive', onPress: clearHistory }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Riwayat Diagnosis" subtitle="Catatan Konsultasi Tersimpan" />

      <View style={styles.topBar}>
        <Text style={styles.countText}>{history.length} Catatan tersimpan</Text>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClearHistory}>
            <Ionicons name="trash-outline" size={14} color={COLORS.danger} />
            <Text style={styles.clearBtnText}>Bersihkan</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="file-tray-outline" size={40} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>Belum Ada Riwayat Diagnosis</Text>
            <Text style={styles.emptyDesc}>
              Jalankan sesi diagnosis pada menu beranda untuk menyimpan catatan konsultasi kawanan ayam Anda.
            </Text>
          </View>
        ) : (
          history.map((item) => {
            const diseaseObj = DISEASES.find((d) => d.id === item.diseaseId);
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={styles.timestamp}>
                      {item.date} • {item.time}
                    </Text>
                    <Text style={styles.diseaseTitle}>{item.diseaseName}</Text>
                  </View>
                  <View style={styles.pctBadge}>
                    <Text style={styles.pctText}>{item.percentage}%</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.symptomCount}>{item.symptomsCount} gejala terkonfirmasi</Text>
                  {diseaseObj && (
                    <TouchableOpacity onPress={() => openDiseaseDetail(diseaseObj)}>
                      <Text style={styles.detailLink}>Detail Penyakit &rarr;</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.muted
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger
  },
  scroll: {
    padding: 16,
    gap: 10,
    paddingBottom: 40
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 8,
    marginTop: 20
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink
  },
  emptyDesc: {
    fontSize: 11,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 16
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 10
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  timestamp: {
    fontSize: 10,
    color: COLORS.muted,
    marginBottom: 2
  },
  diseaseTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink
  },
  pctBadge: {
    backgroundColor: COLORS.brandLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  pctText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.brand
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 8
  },
  symptomCount: {
    fontSize: 10,
    color: COLORS.muted
  },
  detailLink: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  }
});

