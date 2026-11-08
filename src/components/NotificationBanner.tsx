import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDiagnosisStore } from '../store/diagnosisStore';

export const NotificationBanner: React.FC = () => {
  const offlineNotification = useDiagnosisStore((s) => s.offlineNotification);
  const dismissNotification = useDiagnosisStore((s) => s.dismissNotification);

  useEffect(() => {
    if (offlineNotification) {
      const timer = setTimeout(() => {
        dismissNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [offlineNotification, dismissNotification]);

  if (!offlineNotification) return null;

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.banner}>
        <View style={styles.iconWrap}>
          <Ionicons name="cloud-offline" size={16} color="#059669" />
        </View>
        <Text style={styles.bannerText}>{offlineNotification}</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={dismissNotification}>
          <Ionicons name="close" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: 14,
    left: 20,
    right: 20,
    zIndex: 999
  },
  banner: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46'
  },
  closeBtn: {
    padding: 4
  }
});

