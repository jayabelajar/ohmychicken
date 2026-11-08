import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useDiagnosisStore } from '../store/diagnosisStore';

export const AuthScreen: React.FC = () => {
  const login = useDiagnosisStore((s) => s.login);
  const register = useDiagnosisStore((s) => s.register);
  const guestLogin = useDiagnosisStore((s) => s.guestLogin);

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Perhatian', 'Mohon isi email dan kata sandi Anda.');
        return;
      }
      login(email.trim());
    } else {
      if (!name.trim() || !farmName.trim() || !email.trim() || !password.trim()) {
        Alert.alert('Perhatian', 'Mohon lengkapi seluruh formulir pendaftaran.');
        return;
      }
      register(name.trim(), farmName.trim(), email.trim());
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Brand Header */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Ionicons name="pulse" size={24} color={COLORS.surface} />
            </View>
            <Text style={styles.appName}>AyamCare</Text>
            <Text style={styles.appTagline}>Sistem Pakar Diagnosis Peternak Broiler</Text>
          </View>

          {/* Mode Switcher Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabBtn, mode === 'login' && styles.tabBtnActive]}
              activeOpacity={0.8}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Masuk Akun
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, mode === 'register' && styles.tabBtnActive]}
              activeOpacity={0.8}
              onPress={() => setMode('register')}
            >
              <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
                Daftar Baru
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Container */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {mode === 'login' ? 'Selamat Datang Kembali' : 'Registrasi Peternakan'}
            </Text>
            <Text style={styles.formSubtitle}>
              {mode === 'login'
                ? 'Masuk untuk mengelola catatan diagnosis kawanan ayam Anda.'
                : 'Daftarkan peternakan Anda untuk mencatat riwayat diagnosis secara rapi.'}
            </Text>

            {mode === 'register' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nama Lengkap Peternak</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="person-outline" size={18} color={COLORS.muted} />
                    <TextInput
                      style={styles.input}
                      placeholder="Contoh: Pak Budi Santoso"
                      placeholderTextColor={COLORS.muted}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nama Peternakan / Kandang</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons name="home-outline" size={18} color={COLORS.muted} />
                    <TextInput
                      style={styles.input}
                      placeholder="Contoh: Berkah Broiler Farm"
                      placeholderTextColor={COLORS.muted}
                      value={farmName}
                      onChangeText={setFarmName}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email atau Nomor HP</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={18} color={COLORS.muted} />
                <TextInput
                  style={styles.input}
                  placeholder="peternak@kandang.com"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="lock-closed-outline" size={18} color={COLORS.muted} />
                <TextInput
                  style={styles.input}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor={COLORS.muted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={COLORS.muted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Submit Button */}
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {mode === 'login' ? 'Masuk ke Dashboard' : 'Buat Akun Peternak'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.surface} />
            </TouchableOpacity>

            {/* Offline Guest Shortcut */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ATAU</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.guestBtn} activeOpacity={0.8} onPress={guestLogin}>
              <Ionicons name="flash-outline" size={16} color={COLORS.brand} />
              <Text style={styles.guestText}>Lanjut Sebagai Mode Tamu (Offline Langsung)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.canvas
  },
  keyboard: {
    flex: 1
  },
  scroll: {
    padding: 24,
    gap: 18,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 4
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.4
  },
  appTagline: {
    fontSize: 12,
    color: COLORS.muted
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.line
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  tabBtnActive: {
    backgroundColor: '#1E293B'
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted
  },
  tabTextActive: {
    color: COLORS.surface,
    fontWeight: '700'
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink
  },
  formSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 16,
    marginTop: -8,
    marginBottom: 4
  },
  inputGroup: {
    gap: 4
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.inkSecondary
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.canvas,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: COLORS.ink,
    padding: 0
  },
  submitBtn: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 20,
    gap: 8,
    marginTop: 4,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3
  },
  submitText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.surface
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.line
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted
  },
  guestBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    gap: 6
  },
  guestText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brand
  }
});
