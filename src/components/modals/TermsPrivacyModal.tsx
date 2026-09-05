import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

interface TermsPrivacyModalProps {
  visible: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export function TermsPrivacyModal({
  visible,
  onClose,
  initialTab = 'privacy',
}: TermsPrivacyModalProps) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        
        <Animated.View
          entering={FadeInUp.springify().damping(20).stiffness(180)}
          exiting={FadeOutDown.duration(200)}
          style={[
            styles.modalContainer,
            { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
          ]}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.borderDefault }]}>
            <View style={styles.headerLeft}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#38BDF8" />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                  Legal & Compliance
                </Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                  VoltTrack Electrical Progress Governance
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                { backgroundColor: colors.bgInput, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* Segmented Tab Bar */}
          <View style={[styles.tabContainer, { backgroundColor: colors.bgInput }]}>
            <Pressable
              onPress={() => setActiveTab('privacy')}
              style={[
                styles.tabButton,
                activeTab === 'privacy' && [
                  styles.activeTabButton,
                  { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                ],
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={activeTab === 'privacy' ? '#38BDF8' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'privacy' ? '#38BDF8' : colors.textSecondary },
                  activeTab === 'privacy' && styles.activeTabText,
                ]}
              >
                Privacy Policy
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab('terms')}
              style={[
                styles.tabButton,
                activeTab === 'terms' && [
                  styles.activeTabButton,
                  { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
                ],
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={16}
                color={activeTab === 'terms' ? '#38BDF8' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'terms' ? '#38BDF8' : colors.textSecondary },
                  activeTab === 'terms' && styles.activeTabText,
                ]}
              >
                Terms of Service
              </Text>
            </Pressable>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            {activeTab === 'privacy' ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                    Data Privacy & Security Standard
                  </Text>
                  <Text style={[styles.effectiveDate, { color: colors.textSecondary }]}>
                    Last updated: September 2026 • Compliant with Data Privacy Act of 2012
                  </Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
                  <Ionicons name="location" size={18} color="#38BDF8" style={styles.cardIcon} />
                  <View style={styles.cardTextContent}>
                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                      Geo-Location & Photo Evidence Policy
                    </Text>
                    <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                      VoltTrack captures High-Precision GPS coordinates and camera imagery exclusively during active site inspection logging. Geolocation data is never collected in the background when the app is closed.
                    </Text>
                  </View>
                </View>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  1. Information We Collect
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We collect account credentials (email, official engineering license ID), project assignment scope, real-time bill of quantity (BOQ) updates, timestamped inspection logs, and vector CAD markups uploaded by field engineers.
                </Text>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  2. Offline Data Storage & Encryption
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Field logs stored in local SQLite device caches prior to network sync are encrypted using AES-256 standards. Cached inspection data is purged automatically 30 days post cloud synchronization.
                </Text>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  3. Audit Trail Retention
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  In compliance with Philippine Electrical Code (PEC) auditing guidelines, verified site inspection logs, photo proofs, and client sign-offs are archived in secure storage for a mandatory 7-year retention period.
                </Text>
              </>
            ) : (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                    Terms of Service & Field Governance
                  </Text>
                  <Text style={[styles.effectiveDate, { color: colors.textSecondary }]}>
                    Version 2.4 • Effective September 2026
                  </Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
                  <Ionicons name="ribbon" size={18} color="#38BDF8" style={styles.cardIcon} />
                  <View style={styles.cardTextContent}>
                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                      Certified Professional Standard
                    </Text>
                    <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                      All quantity verification logs and safety inspection reports filed through VoltTrack carry legally binding professional attestations by Registered Electrical Engineers (REE) or Master Electricians.
                    </Text>
                  </View>
                </View>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  1. Authorized Platform Use
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Users are strictly granted non-exclusive, non-transferable access limited to assigned active construction sites in Tagum City and regional municipal projects. Account sharing across inspectors is strictly prohibited.
                </Text>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  2. Accuracy of Quantity Logging
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Submitting fraudulent, estimated, or unverified installed quantities is a breach of engineering ethics and platform terms, which may result in immediate credential revocation and disciplinary review.
                </Text>

                <Text style={[styles.paragraphTitle, { color: colors.textPrimary }]}>
                  3. System Availability & Service Level
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  VoltTrack maintains a 99.8% uptime SLA. During server maintenance, offline mode remains operational for field logging and local CAD inspection.
                </Text>
              </>
            )}
          </ScrollView>

          {/* Footer Action */}
          <View style={[styles.footer, { borderTopColor: colors.borderDefault }]}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: colors.voltOrange, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Text style={styles.actionButtonText}>I Understand & Agree</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 6,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    gap: 6,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTabButton: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    gap: 14,
  },
  sectionHeader: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  effectiveDate: {
    fontSize: 12,
    marginTop: 2,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    alignItems: 'flex-start',
  },
  cardIcon: {
    marginTop: 2,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  paragraphTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
