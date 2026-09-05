import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  userRole?: 'engineer' | 'client' | string;
  userName?: string;
  onSwitchRole?: (newRole: 'engineer' | 'client') => void;
}

export function SettingsModal({
  visible,
  onClose,
  userRole = 'Field Engineer',
  userName = 'User',
  onSwitchRole,
}: SettingsModalProps) {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  // Settings Local States
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoOfflineSync, setAutoOfflineSync] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    setCacheCleared(true);
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Cache Cleared',
        'Local SQLite inspection logs and offline blueprint assets have been refreshed.'
      );
    }
  };

  const handleRoleSwitch = (targetRole: 'engineer' | 'client') => {
    onClose();
    if (onSwitchRole) {
      onSwitchRole(targetRole);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        <Animated.View
          entering={FadeInUp.duration(250).springify()}
          exiting={FadeOutDown.duration(200)}
          style={[
            styles.modalCard,
            { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
          ]}
        >
          {/* Header */}
          <View style={[styles.modalHeader, { borderColor: colors.borderDefault, backgroundColor: colors.bgInput }]}>
            <View style={styles.headerTitleRow}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 85, 0, 0.15)', borderColor: 'rgba(255, 85, 0, 0.3)' }]}>
                <Ionicons name="options" size={20} color={colors.voltOrange} />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>App Settings</Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                  Logged in as {userName} ({userRole})
                </Text>
              </View>
            </View>

            <Pressable style={[styles.closeButton, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]} onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView
            style={{ maxHeight: 460 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Section 1: Appearance & Display */}
            <View style={[styles.sectionCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
              <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>APPEARANCE & DISPLAY</Text>

              <View style={{ gap: 12 }}>
                <View style={styles.settingTextGroup}>
                  <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>App Theme Mode</Text>
                  <Text style={[styles.settingSublabel, { color: colors.textSecondary }]}>
                    Switch between Midnight Dark and Clean Light themes
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Pressable
                    style={[
                      styles.roleSwitchBtn,
                      { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                      !isDarkMode && {
                        borderColor: '#FF5500',
                        backgroundColor: 'rgba(255, 85, 0, 0.15)',
                      },
                    ]}
                    onPress={() => {
                      if (isDarkMode) toggleTheme();
                    }}
                  >
                    <Ionicons
                      name="sunny-outline"
                      size={18}
                      color={!isDarkMode ? '#FF5500' : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.roleSwitchBtnText,
                        { color: colors.textSecondary },
                        !isDarkMode && { color: '#FF5500', fontWeight: '800' },
                      ]}
                    >
                      Light Mode
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.roleSwitchBtn,
                      { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                      isDarkMode && {
                        borderColor: '#38BDF8',
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      },
                    ]}
                    onPress={() => {
                      if (!isDarkMode) toggleTheme();
                    }}
                  >
                    <Ionicons
                      name="moon-outline"
                      size={18}
                      color={isDarkMode ? '#38BDF8' : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.roleSwitchBtnText,
                        { color: colors.textSecondary },
                        isDarkMode && { color: '#38BDF8', fontWeight: '800' },
                      ]}
                    >
                      Dark Mode
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Section 2: Sync & Notifications */}
            <View style={[styles.sectionCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
              <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>NOTIFICATIONS & OFFLINE SYNC</Text>

              <View style={styles.settingRow}>
                <View style={styles.settingTextGroup}>
                  <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Push Milestone Alerts</Text>
                  <Text style={[styles.settingSublabel, { color: colors.textSecondary }]}>
                    Notifications when engineers verify installation quantity
                  </Text>
                </View>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#94A3B8', true: colors.voltOrange }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.borderDefault }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingTextGroup}>
                  <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Auto Offline SQLite Sync</Text>
                  <Text style={[styles.settingSublabel, { color: colors.textSecondary }]}>
                    Upload site photos automatically when network is restored
                  </Text>
                </View>
                <Switch
                  value={autoOfflineSync}
                  onValueChange={setAutoOfflineSync}
                  trackColor={{ false: '#94A3B8', true: '#38BDF8' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            {/* Section 3: Data & Storage */}
            <View style={[styles.sectionCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
              <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>STORAGE & LOCAL CACHE</Text>

              <View style={styles.settingRow}>
                <View style={styles.settingTextGroup}>
                  <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Offline Device Cache</Text>
                  <Text style={[styles.settingSublabel, { color: colors.textSecondary }]}>
                    {cacheCleared
                      ? 'Local cache cleared • 0 KB'
                      : 'SQLite Inspection Logs & Assets • 3.4 MB'}
                  </Text>
                </View>
                <Pressable
                  onPress={handleClearCache}
                  style={styles.actionButtonSecondary}
                >
                  <Ionicons
                    name={cacheCleared ? 'checkmark' : 'trash-outline'}
                    size={14}
                    color={cacheCleared ? colors.success : colors.voltOrange}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      { color: colors.voltOrange },
                      cacheCleared && { color: colors.success },
                    ]}
                  >
                    {cacheCleared ? 'Cleared' : 'Clear'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Section 4: Dev Role Switcher */}
            {onSwitchRole && (
              <View style={[styles.sectionCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
                <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>DEVELOPMENT ROLE SWITCHER</Text>

                <View style={styles.roleSwitchRow}>
                  <Pressable
                    style={[
                      styles.roleSwitchBtn,
                      { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                      userRole.toLowerCase().includes('engineer') &&
                        styles.roleSwitchBtnActiveEngineer,
                    ]}
                    onPress={() => handleRoleSwitch('engineer')}
                  >
                    <Ionicons name="construct" size={16} color="#38BDF8" />
                    <Text style={[styles.roleSwitchBtnText, { color: colors.textPrimary }]}>Switch to Engineer</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.roleSwitchBtn,
                      { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                      userRole.toLowerCase().includes('owner') &&
                        styles.roleSwitchBtnActiveClient,
                    ]}
                    onPress={() => handleRoleSwitch('client')}
                  >
                    <Ionicons name="person" size={16} color={colors.voltOrange} />
                    <Text style={[styles.roleSwitchBtnText, { color: colors.textPrimary }]}>Switch to Client</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* App Footer Info */}
            <View style={styles.modalFooter}>
              <Text style={[styles.footerAppTitle, { color: colors.textMuted }]}>VOLTTRACK SYSTEM</Text>
              <Text style={[styles.footerVersion, { color: colors.textSecondary }]}>
                v2.4.0 • Tagum City Electrical Project Capstone
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)' } as any)
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 0.3,
          shadowRadius: 24,
          elevation: 16,
        }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingTextGroup: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  settingSublabel: {
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 85, 0, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 0, 0.3)',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  roleSwitchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleSwitchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  roleSwitchBtnActiveEngineer: {
    borderColor: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  roleSwitchBtnActiveClient: {
    borderColor: '#FF5500',
    backgroundColor: 'rgba(255, 85, 0, 0.12)',
  },
  roleSwitchBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalFooter: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerAppTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  footerVersion: {
    fontSize: 10,
    marginTop: 2,
  },
});
