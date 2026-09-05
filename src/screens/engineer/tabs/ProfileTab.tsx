import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';

interface ProfileTabProps {
  onLogout: () => void;
}

export function ProfileTab({ onLogout }: ProfileTabProps) {
  const { colors } = useTheme();

  const [phone, setPhone] = useState('+63 917 882 1940');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneSaved, setPhoneSaved] = useState(false);

  const handleSavePhone = () => {
    setIsEditingPhone(false);
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 3000);
  };

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      {/* Engineer Professional Identity Header */}
      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <View style={styles.headerRow}>
          <View style={[styles.avatarBox, { backgroundColor: colors.voltOrange }]}>
            <Text style={styles.avatarText}>JA</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[styles.engineerName, { color: colors.textPrimary }]}>Engr. John Andrei Afable</Text>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            </View>
            <Text style={[styles.engineerTitle, { color: colors.textSecondary }]}>Registered Electrical Engineer (REE)</Text>
            <View style={styles.prcBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#38BDF8" />
              <Text style={styles.prcBadgeText}>PRC LICENSE #0144110 • VERIFIED</Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.borderDefault }]} />

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.textMuted }]}>ASSIGNED DIVISION</Text>
            <Text style={[styles.metaValue, { color: colors.textPrimary }]}>Tagum City Field Inspection Unit</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: colors.textMuted }]}>INSPECTION TERRITORY</Text>
            <Text style={[styles.metaValue, { color: '#38BDF8' }]}>Mabini St. Commercial District</Text>
          </View>
        </View>
      </View>

      {/* Official Credentials & Compliance Status */}
      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Professional Credentials & PEC Compliance</Text>

        <View style={{ gap: 10, marginTop: 10 }}>
          <View style={[styles.credentialRow, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <View style={styles.iconCircleBlue}>
              <Ionicons name="ribbon-outline" size={18} color="#38BDF8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.credTitle, { color: colors.textPrimary }]}>Philippine Electrical Code (PEC 2026)</Text>
              <Text style={[styles.credSub, { color: colors.textSecondary }]}>Certified Inspector • Valid through Dec 2028</Text>
            </View>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>VALID</Text>
            </View>
          </View>

          <View style={[styles.credentialRow, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <View style={styles.iconCircleOrange}>
              <Ionicons name="shield-outline" size={18} color={colors.voltOrange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.credTitle, { color: colors.textPrimary }]}>DOLE BOSH Safety Officer II</Text>
              <Text style={[styles.credSub, { color: colors.textSecondary }]}>40-Hr Construction Safety Accredited</Text>
            </View>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>ACTIVE</Text>
            </View>
          </View>

          <View style={[styles.credentialRow, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <View style={styles.iconCircleGreen}>
              <Ionicons name="key-outline" size={18} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.credTitle, { color: colors.textPrimary }]}>Geo-Tagged Mobile Stamp</Text>
              <Text style={[styles.credSub, { color: colors.textSecondary }]}>Digital Sign-off Cryptographic Key Active</Text>
            </View>
            <View style={styles.activePillGreen}>
              <Text style={styles.activePillTextGreen}>READY</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Engineer Duty Contact Specs */}
      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Workstation Contact Info</Text>

        <View style={{ gap: 12, marginTop: 12 }}>
          {/* Phone Edit Row */}
          <View style={[styles.contactRow, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <Ionicons name="call-outline" size={18} color={colors.voltOrange} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactLabel, { color: colors.textMuted }]}>INSPECTION FIELD PHONE</Text>
              {isEditingPhone ? (
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={[styles.phoneInput, { color: colors.textPrimary, borderColor: colors.borderDefault }]}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={[styles.contactValue, { color: colors.textPrimary }]}>{phone}</Text>
              )}
            </View>

            {isEditingPhone ? (
              <Pressable style={styles.savePhoneBtn} onPress={handleSavePhone}>
                <Text style={styles.savePhoneBtnText}>SAVE</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.editPhoneBtn} onPress={() => setIsEditingPhone(true)}>
                <Text style={styles.editPhoneBtnText}>EDIT</Text>
              </Pressable>
            )}
          </View>

          {phoneSaved && (
            <View style={styles.savedAlert}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.savedAlertText, { color: colors.success }]}>Workstation phone number updated successfully.</Text>
            </View>
          )}

          {/* Email Row */}
          <View style={[styles.contactRow, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <Ionicons name="mail-outline" size={18} color="#38BDF8" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactLabel, { color: colors.textMuted }]}>OFFICIAL INSPECTION EMAIL</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>j.afable@voltrack.gov.ph</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Logout Workstation Action */}
      <View style={{ marginBottom: 30 }}>
        <Pressable
          onPress={onLogout}
          style={[styles.logoutBtn, { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={[styles.logoutBtnText, { color: colors.error }]}>LOGOUT FIELD WORKSTATION</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  engineerName: {
    fontSize: 17,
    fontWeight: '800',
  },
  engineerTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  prcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  prcBadgeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },

  // Credentials Section
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  iconCircleBlue: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleOrange: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleGreen: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  credTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  credSub: {
    fontSize: 11,
    marginTop: 2,
  },
  activePill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activePillText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
  },
  activePillGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activePillTextGreen: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '800',
  },

  // Contact Section
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  contactLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  phoneInput: {
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 2,
  },
  editPhoneBtn: {
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editPhoneBtnText: {
    color: '#FF5500',
    fontSize: 11,
    fontWeight: '800',
  },
  savePhoneBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  savePhoneBtnText: {
    color: '#050914',
    fontSize: 11,
    fontWeight: '800',
  },
  savedAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  savedAlertText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
