import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { triggerHaptic } from '../../utils/haptics';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FeedbackModal({ visible, onClose }: FeedbackModalProps) {
  const { colors } = useTheme();
  const [type, setType] = useState<'bug' | 'feature' | 'general'>('bug');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSelectType = (selectedType: 'bug' | 'feature' | 'general') => {
    triggerHaptic.selection();
    setType(selectedType);
  };

  const handleSelectRating = (selectedRating: number) => {
    triggerHaptic.selection();
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    triggerHaptic.success();
    setSubmitted(true);
  };

  const handleReset = () => {
    triggerHaptic.light();
    setSubmitted(false);
    setComments('');
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
                <Ionicons name="chatbox-ellipses" size={20} color={colors.voltOrange} />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Send Workstation Feedback</Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                  Help us improve VoltTrack for Tagum City engineers
                </Text>
              </View>
            </View>

            <Pressable style={[styles.closeBtn, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]} onPress={onClose}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {submitted ? (
              <View style={[styles.submittedCard, { backgroundColor: 'rgba(34, 197, 94, 0.12)', borderColor: 'rgba(34, 197, 94, 0.3)' }]}>
                <Ionicons name="checkmark-circle" size={44} color={colors.success} />
                <Text style={[styles.submittedTitle, { color: colors.textPrimary }]}>Feedback Received!</Text>
                <Text style={[styles.submittedSub, { color: colors.textSecondary }]}>
                  Reference Ticket: #FB-2026-9041. Our engineering team has received your submission.
                </Text>
                <Pressable style={[styles.resetBtn, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]} onPress={handleReset}>
                  <Text style={{ color: '#38BDF8', fontSize: 12, fontWeight: '700' }}>Send Another Feedback</Text>
                </Pressable>
              </View>
            ) : (
              <View style={{ gap: 16 }}>
                {/* Feedback Category Pills */}
                <View>
                  <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>FEEDBACK TYPE</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Pressable
                      onPress={() => handleSelectType('bug')}
                      style={[
                        styles.typePill,
                        { backgroundColor: colors.bgInput, borderColor: colors.borderDefault },
                        type === 'bug' && { borderColor: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.15)' },
                      ]}
                    >
                      <Ionicons name="bug-outline" size={14} color={type === 'bug' ? '#EF4444' : colors.textMuted} />
                      <Text style={[styles.typePillText, { color: type === 'bug' ? '#EF4444' : colors.textSecondary }]}>Bug Report</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleSelectType('feature')}
                      style={[
                        styles.typePill,
                        { backgroundColor: colors.bgInput, borderColor: colors.borderDefault },
                        type === 'feature' && { borderColor: '#38BDF8', backgroundColor: 'rgba(56, 189, 248, 0.15)' },
                      ]}
                    >
                      <Ionicons name="sparkles-outline" size={14} color={type === 'feature' ? '#38BDF8' : colors.textMuted} />
                      <Text style={[styles.typePillText, { color: type === 'feature' ? '#38BDF8' : colors.textSecondary }]}>Feature Idea</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleSelectType('general')}
                      style={[
                        styles.typePill,
                        { backgroundColor: colors.bgInput, borderColor: colors.borderDefault },
                        type === 'general' && { borderColor: colors.voltOrange, backgroundColor: 'rgba(255, 85, 0, 0.15)' },
                      ]}
                    >
                      <Ionicons name="bulb-outline" size={14} color={type === 'general' ? colors.voltOrange : colors.textMuted} />
                      <Text style={[styles.typePillText, { color: type === 'general' ? colors.voltOrange : colors.textSecondary }]}>General</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Rating Stars */}
                <View>
                  <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>EXPERIENCE RATING</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Pressable key={star} onPress={() => handleSelectRating(star)} hitSlop={6}>
                        <Ionicons
                          name={star <= rating ? 'star' : 'star-outline'}
                          size={24}
                          color={star <= rating ? '#F59E0B' : colors.textMuted}
                        />
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Comments Text Input */}
                <View>
                  <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>DETAILS & COMMENTS</Text>
                  <View style={[styles.textAreaBox, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
                    <TextInput
                      value={comments}
                      onChangeText={setComments}
                      multiline
                      numberOfLines={4}
                      placeholder="Describe what happened or your suggestion for site inspections..."
                      placeholderTextColor={colors.textMuted}
                      style={[styles.textArea, { color: colors.textPrimary }]}
                    />
                  </View>
                </View>

                {/* Submit Action */}
                <Pressable
                  onPress={handleSubmit}
                  style={[styles.submitBtn, { backgroundColor: colors.voltOrange }]}
                >
                  <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
                  <Text style={styles.submitBtnText}>SUBMIT FEEDBACK</Text>
                </Pressable>
              </View>
            )}
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
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 0, 0.3)',
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
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  typePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textAreaBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  textArea: {
    height: 80,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  submittedCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  submittedTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
  },
  submittedSub: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  resetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 14,
  },
});
