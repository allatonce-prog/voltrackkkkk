import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { HelpSupportModal } from './modals/HelpSupportModal';
import { FeedbackModal } from './modals/FeedbackModal';
import { TermsPrivacyModal } from './modals/TermsPrivacyModal';
import { triggerHaptic } from '../utils/haptics';

interface UserAvatarDropdownProps {
  userName?: string;
  userRole?: string;
  onSelectProfile: () => void;
  onSelectSettings: () => void;
  onLogout: () => void;
}

export function UserAvatarDropdown({
  userName = 'John Andrei',
  userRole = 'Field Engineer',
  onSelectProfile,
  onSelectSettings,
  onLogout,
}: UserAvatarDropdownProps) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Modal Visibility States
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const toggleDropdown = () => {
    triggerHaptic.selection();
    setIsOpen((prev) => !prev);
  };

  const handleAction = (action: () => void) => {
    triggerHaptic.light();
    setIsOpen(false);
    action();
  };

  const handleHelpCenter = () => {
    triggerHaptic.light();
    setIsOpen(false);
    setIsHelpOpen(true);
  };

  const handleFeedback = () => {
    triggerHaptic.light();
    setIsOpen(false);
    setIsFeedbackOpen(true);
  };

  const handlePrivacyTerms = () => {
    triggerHaptic.light();
    setIsOpen(false);
    setIsTermsOpen(true);
  };

  return (
    <View>
      <Pressable
        style={[
          styles.avatarButton,
          { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
        ]}
        onPress={toggleDropdown}
        hitSlop={6}
      >
        <View style={[styles.avatarBadge, { backgroundColor: colors.voltOrange }]}>
          <Text style={styles.avatarText}>{getInitials(userName)}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={colors.textSecondary}
        />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                entering={FadeInUp.duration(200)}
                exiting={FadeOutUp.duration(150)}
                style={[
                  styles.dropdownMenu,
                  { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                ]}
              >
                {/* Header Info */}
                <View style={styles.menuHeader}>
                  <Text style={[styles.menuUserName, { color: colors.textPrimary }]}>{userName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success }} />
                    <Text style={[styles.menuUserRole, { color: colors.textMuted }]}>{userRole}</Text>
                  </View>
                </View>

                <View style={[styles.menuDivider, { backgroundColor: colors.borderDefault }]} />

                {/* Main Action Items */}
                <Pressable
                  style={styles.menuItem}
                  onPress={() => handleAction(onSelectProfile)}
                >
                  <Ionicons name="person-outline" size={17} color="#38BDF8" />
                  <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Profile</Text>
                </Pressable>

                <Pressable
                  style={styles.menuItem}
                  onPress={() => handleAction(onSelectSettings)}
                >
                  <Ionicons name="options-outline" size={17} color={colors.textSecondary} />
                  <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Settings</Text>
                </Pressable>

                <View style={[styles.menuDivider, { backgroundColor: colors.borderDefault }]} />

                {/* Standard App Support & Legal Items */}
                <Pressable
                  style={styles.menuItem}
                  onPress={handleHelpCenter}
                >
                  <Ionicons name="help-circle-outline" size={17} color="#38BDF8" />
                  <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Help & Support</Text>
                </Pressable>

                <Pressable
                  style={styles.menuItem}
                  onPress={handleFeedback}
                >
                  <Ionicons name="chatbox-ellipses-outline" size={17} color={colors.voltOrange} />
                  <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Send Feedback</Text>
                </Pressable>

                <Pressable
                  style={styles.menuItem}
                  onPress={handlePrivacyTerms}
                >
                  <Ionicons name="document-text-outline" size={17} color={colors.textMuted} />
                  <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Terms & Privacy</Text>
                </Pressable>

                <View style={[styles.menuDivider, { backgroundColor: colors.borderDefault }]} />

                {/* Logout Action */}
                <Pressable
                  style={[styles.menuItem, styles.logoutItem]}
                  onPress={() => handleAction(onLogout)}
                >
                  <Ionicons name="log-out-outline" size={17} color={colors.error} />
                  <Text style={[styles.menuItemText, styles.logoutText, { color: colors.error }]}>Logout</Text>
                </Pressable>

                {/* App Version Footer */}
                <View style={[styles.menuFooter, { borderTopColor: colors.borderDefault }]}>
                  <Text style={[styles.versionText, { color: colors.textMuted }]}>VOLTTRACK v2.4.0 • TAGUM</Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Standard App Modals */}
      <HelpSupportModal
        visible={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
      <FeedbackModal
        visible={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
      <TermsPrivacyModal
        visible={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
  },
  avatarBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 65,
    paddingRight: 20,
  },
  dropdownMenu: {
    width: 215,
    borderRadius: 18,
    paddingVertical: 8,
    borderWidth: 1,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.25)' } as any)
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 12,
        }),
  },
  menuHeader: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  menuUserName: {
    fontSize: 14,
    fontWeight: '800',
  },
  menuUserRole: {
    fontSize: 11,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    marginVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logoutItem: {
    marginTop: 2,
  },
  logoutText: {
    fontWeight: '800',
  },
  menuFooter: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
    marginTop: 4,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
