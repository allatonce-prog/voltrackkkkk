import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { triggerHaptic } from '../../utils/haptics';

interface HelpSupportModalProps {
  visible: boolean;
  onClose: () => void;
}

export function HelpSupportModal({ visible, onClose }: HelpSupportModalProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const handleToggleFaq = (id: string) => {
    triggerHaptic.selection();
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 'faq-1',
      question: 'How does offline quantity logging work in VoltTrack?',
      answer:
        'Field inspection logs recorded on site without internet are stored in local SQLite device cache. Once cellular or Wi-Fi connection is restored in Tagum City, the app automatically pushes queued logs to the central database.',
    },
    {
      id: 'faq-2',
      question: 'How are geo-tagged site photo proofs authenticated?',
      answer:
        'Every captured photo includes embedded GPS coordinates (Latitude/Longitude), precise timestamp, and inspector cryptographic signature hash verifying physical presence on site.',
    },
    {
      id: 'faq-3',
      question: 'How is Automated Progress Estimation calculated?',
      answer:
        'Overall completion is calculated using: Progress % = Σ (Installed Qty / Planned BOQ Qty) × Milestone Weight Factor across Conduits (25%), Wiring (25%), Panels (20%), Fixtures (20%), and Testing (10%).',
    },
    {
      id: 'faq-4',
      question: 'What should I do if CAD blueprint layers fail to load?',
      answer:
        'Open the Settings dialog from the top right user menu and tap "Clear Local Cache" to refresh vector layer definitions (E-CONDUIT, E-WIRING, E-PANEL, E-LIGHT).',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCallHotline = () => {
    triggerHaptic.medium();
    if (Platform.OS !== 'web') {
      Alert.alert('Calling Hotline', 'Connecting to Tagum City Field Inspection Desk: +63 917 882 1940');
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
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
          <View style={[styles.header, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <Ionicons name="help-circle" size={20} color="#38BDF8" />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Help & Support Center</Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                  Tagum City Electrical Project Documentation & FAQs
                </Text>
              </View>
            </View>

            <Pressable style={[styles.closeBtn, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]} onPress={onClose}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: 480 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Search Box */}
            <View style={[styles.searchBox, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
              <Ionicons name="search-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search FAQs (e.g. offline, photo proof, BOQ)..."
                placeholderTextColor={colors.textMuted}
                style={[styles.searchInput, { color: colors.textPrimary }]}
              />
              {searchQuery ? (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>

            {/* FAQs Accordion */}
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>FREQUENTLY ASKED QUESTIONS</Text>
            <View style={{ gap: 10 }}>
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <Pressable
                    key={faq.id}
                    onPress={() => handleToggleFaq(faq.id)}
                    style={[
                      styles.faqCard,
                      { backgroundColor: colors.bgInput, borderColor: colors.borderDefault },
                      isExpanded && { borderColor: '#38BDF8', backgroundColor: 'rgba(56, 189, 248, 0.08)' },
                    ]}
                  >
                    <View style={styles.faqHeader}>
                      <Text style={[styles.faqQuestion, { color: colors.textPrimary }]}>{faq.question}</Text>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color={isExpanded ? '#38BDF8' : colors.textMuted}
                      />
                    </View>
                    {isExpanded && (
                      <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Direct Support Desk Cards */}
            <Text style={[styles.sectionTitle, { color: colors.textMuted, marginTop: 16 }]}>DIRECT SUPPORT DESK</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                onPress={handleCallHotline}
                style={[styles.contactCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}
              >
                <Ionicons name="call" size={20} color="#38BDF8" />
                <View>
                  <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Field Hotline</Text>
                  <Text style={[styles.contactSub, { color: colors.textSecondary }]}>+63 917 882 1940</Text>
                </View>
              </Pressable>

              <View style={[styles.contactCard, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
                <Ionicons name="mail" size={20} color={colors.voltOrange} />
                <View>
                  <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Email Support</Text>
                  <Text style={[styles.contactSub, { color: colors.textSecondary }]}>support@voltrack.gov.ph</Text>
                </View>
              </View>
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
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
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
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContent: {
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: 16,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  faqCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  contactCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  contactSub: {
    fontSize: 10,
    marginTop: 1,
  },
});
