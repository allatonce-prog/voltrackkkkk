import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { CADBlueprintModal } from './CADBlueprintModal';
import { ElectricalMilestone } from '../types/project';
import { calculateMilestonePercentage } from '../utils/progressCalculator';
import { theme } from '../theme/theme';

interface ProgressDetailModalProps {
  visible: boolean;
  milestone: ElectricalMilestone | null;
  onClose: () => void;
  onLogProgressWithPhoto?: (
    milestoneId: string,
    addedQuantity: number,
    photoTitle: string
  ) => void;
}

export function ProgressDetailModal({
  visible,
  milestone,
  onClose,
  onLogProgressWithPhoto,
}: ProgressDetailModalProps) {
  if (!milestone) return null;

  const [isLogging, setIsLogging] = useState(false);
  const [addedQty, setAddedQty] = useState(milestone.unit === 'meters' ? '10' : '1');
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [photoTitle, setPhotoTitle] = useState(`${milestone.name} Verification Log`);
  const [isCadModalOpen, setIsCadModalOpen] = useState(false);

  const percent = calculateMilestonePercentage(milestone);
  const weightPercent = Math.round(milestone.weightFactor * 100);
  const remainingQty = Math.max(0, milestone.totalPlannedQuantity - milestone.installedQuantity);
  const contributionPercentage = (
    (milestone.installedQuantity / Math.max(1, milestone.totalPlannedQuantity)) *
    weightPercent
  ).toFixed(1);

  const handleCameraCapture = () => {
    setPhotoCaptured(true);
    Alert.alert(
      'Photo Proof Captured',
      'On-site photo attached with GPS metadata: Tagum City (Lat 7.447, Long 125.808)'
    );
  };

  const handleSubmitProgress = () => {
    const numQty = parseFloat(addedQty);
    if (isNaN(numQty) || numQty <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid installed quantity.');
      return;
    }

    if (!photoCaptured) {
      Alert.alert(
        'Photo Proof Required',
        'Capstone Progress Estimation requires attaching an on-site photo proof before submitting.'
      );
      return;
    }

    if (onLogProgressWithPhoto) {
      onLogProgressWithPhoto(milestone.id, numQty, photoTitle);
    }

    setIsLogging(false);
    setPhotoCaptured(false);
    onClose();
  };

  const getCadLayerName = (category: ElectricalMilestone['category']) => {
    switch (category) {
      case 'conduit':
        return 'E-CONDUIT';
      case 'wiring':
        return 'E-WIRING';
      case 'panelboard':
        return 'E-PANEL';
      case 'fixtures':
        return 'E-LIGHT';
      default:
        return 'all';
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                entering={FadeInUp.duration(300)}
                exiting={FadeOutDown.duration(200)}
                style={styles.modalCard}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <View style={styles.headerLeft}>
                      <View style={styles.iconBadge}>
                        <Ionicons name={milestone.icon} size={22} color={theme.colors.voltOrange} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.milestoneTitle}>{milestone.name}</Text>
                        <View style={styles.badgeRow}>
                          <View style={styles.weightBadge}>
                            <Text style={styles.weightBadgeText}>Weight Factor: {weightPercent}%</Text>
                          </View>
                          <View
                            style={[
                              styles.statusBadge,
                              {
                                backgroundColor:
                                  milestone.inspectionStatus === 'verified'
                                    ? 'rgba(16, 185, 129, 0.15)'
                                    : 'rgba(245, 158, 11, 0.15)',
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusBadgeText,
                                {
                                  color:
                                    milestone.inspectionStatus === 'verified'
                                      ? theme.colors.success
                                      : '#F59E0B',
                                },
                              ]}
                            >
                              {milestone.inspectionStatus === 'verified'
                                ? '● Verified'
                                : '● Pending Inspection'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
                      <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
                    </Pressable>
                  </View>

                  {/* Progress Math & Gauges */}
                  <View style={styles.sectionCard}>
                    <View style={styles.mathRow}>
                      <View>
                        <Text style={styles.mathLabel}>Automated Subtask Progress</Text>
                        <Text style={styles.mathSub}>
                          Formula: (Installed / Planned) × Weight Factor
                        </Text>
                      </View>
                      <Text style={styles.mathValue}>{contributionPercentage}%</Text>
                    </View>

                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${percent}%` }]} />
                    </View>

                    {/* Quantity Breakdown Grid */}
                    <View style={styles.qtyGrid}>
                      <View style={styles.qtyBox}>
                        <Text style={styles.qtyVal}>{milestone.totalPlannedQuantity}</Text>
                        <Text style={styles.qtyLbl}>Planned CAD ({milestone.unit})</Text>
                      </View>
                      <View style={styles.qtyBox}>
                        <Text style={[styles.qtyVal, { color: theme.colors.voltOrange }]}>
                          {milestone.installedQuantity}
                        </Text>
                        <Text style={styles.qtyLbl}>Installed On-Site</Text>
                      </View>
                      <View style={styles.qtyBox}>
                        <Text style={[styles.qtyVal, { color: '#38BDF8' }]}>{remainingQty}</Text>
                        <Text style={styles.qtyLbl}>Remaining</Text>
                      </View>
                    </View>
                  </View>

                  {/* Integrated Progress & Photo Proof Log Section */}
                  {isLogging ? (
                    <View style={styles.loggingCard}>
                      <View style={styles.loggingHeader}>
                        <Ionicons name="add-circle-outline" size={20} color={theme.colors.voltOrange} />
                        <Text style={styles.loggingTitle}>Log New Progress & Attach Photo Proof</Text>
                      </View>

                      <Text style={styles.inputLabel}>Quantity Installed (+{milestone.unit})</Text>
                      <View style={styles.inputRow}>
                        <TextInput
                          style={styles.qtyInput}
                          value={addedQty}
                          onChangeText={setAddedQty}
                          keyboardType="numeric"
                        />
                        <Pressable
                          style={styles.stepBtn}
                          onPress={() =>
                            setAddedQty((q) =>
                              String(Math.max(1, (parseFloat(q) || 0) + (milestone.unit === 'meters' ? 10 : 1)))
                            )
                          }
                        >
                          <Ionicons name="add" size={18} color="#FFFFFF" />
                        </Pressable>
                      </View>

                      {/* Camera Attachment Box */}
                      <Text style={styles.inputLabel}>Geo-Tagged Site Photo Proof (Required)</Text>
                      <Pressable
                        style={[styles.photoProofBox, photoCaptured && styles.photoCapturedBox]}
                        onPress={handleCameraCapture}
                      >
                        <Ionicons
                          name={photoCaptured ? 'checkmark-circle' : 'camera'}
                          size={28}
                          color={photoCaptured ? theme.colors.success : theme.colors.voltOrange}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.photoProofTitle}>
                            {photoCaptured ? 'Photo Proof Attached' : 'Capture Site Inspection Photo'}
                          </Text>
                          <Text style={styles.photoProofSub}>
                            {photoCaptured
                              ? 'GPS: Tagum City (Lat 7.447, Long 125.808)'
                              : 'Tap to open camera with GPS auto-tagging'}
                          </Text>
                        </View>
                      </Pressable>

                      <View style={styles.logActionRow}>
                        <Pressable style={styles.submitLogBtn} onPress={handleSubmitProgress}>
                          <Ionicons name="checkmark-done-circle" size={18} color="#FFFFFF" />
                          <Text style={styles.submitLogBtnText}>Submit & Recalculate %</Text>
                        </Pressable>

                        <Pressable
                          style={styles.cancelLogBtn}
                          onPress={() => setIsLogging(false)}
                        >
                          <Text style={styles.cancelLogBtnText}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                  ) : (
                    /* Field Inspector Verification Details */
                    <>
                      <Text style={styles.sectionTitle}>Field Inspection Verification Log</Text>
                      <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                          <Ionicons name="person-circle-outline" size={18} color="#38BDF8" />
                          <Text style={styles.infoLabel}>Site Inspector:</Text>
                          <Text style={styles.infoVal}>
                            {milestone.inspectorName || 'J. Afable (Field Engineer)'}
                          </Text>
                        </View>

                        <View style={styles.infoRow}>
                          <Ionicons name="location-outline" size={18} color={theme.colors.voltOrange} />
                          <Text style={styles.infoLabel}>Location:</Text>
                          <Text style={styles.infoVal}>
                            {milestone.locationCoordinates || 'Mabini St., Tagum City'}
                          </Text>
                        </View>

                        <View style={styles.infoRow}>
                          <Ionicons name="time-outline" size={18} color={theme.colors.textSecondary} />
                          <Text style={styles.infoLabel}>Last Verified:</Text>
                          <Text style={styles.infoVal}>
                            {milestone.lastVerifiedTimestamp || '2026-09-03 14:30'}
                          </Text>
                        </View>

                        <View style={styles.infoRow}>
                          <Ionicons name="camera-outline" size={18} color={theme.colors.success} />
                          <Text style={styles.infoLabel}>Proof Photo:</Text>
                          <Text style={styles.infoVal}>
                            {milestone.proofPhotoTitle || 'Verified Wire Log'}
                          </Text>
                        </View>
                      </View>

                      {/* CAD Blueprint Drawing Shortcut */}
                      <Pressable
                        style={styles.cadMapShortcutBtn}
                        onPress={() => setIsCadModalOpen(true)}
                      >
                        <Ionicons name="map-outline" size={18} color="#38BDF8" />
                        <Text style={styles.cadMapShortcutText}>
                          View CAD Layer Blueprint ({getCadLayerName(milestone.category)})
                        </Text>
                      </Pressable>
                    </>
                  )}

                  {/* Actions */}
                  {!isLogging ? (
                    <View style={styles.actionRow}>
                      {percent < 100 ? (
                        <Pressable
                          style={styles.logButton}
                          onPress={() => setIsLogging(true)}
                        >
                          <Ionicons name="camera-outline" size={18} color="#FFFFFF" />
                          <Text style={styles.logButtonText}>Log Progress & Attach Photo</Text>
                        </Pressable>
                      ) : null}

                      <Pressable style={styles.doneButton} onPress={onClose}>
                        <Text style={styles.doneButtonText}>Close Inspector</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Embedded CAD Blueprint Viewer */}
      <CADBlueprintModal
        visible={isCadModalOpen}
        onClose={() => setIsCadModalOpen(false)}
        activeLayerFilter={getCadLayerName(milestone.category)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalCard: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '88%',
    backgroundColor: theme.colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.borderDefault,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  milestoneTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  weightBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  weightBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#38BDF8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Math Section
  sectionCard: {
    backgroundColor: theme.colors.bgInput,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    marginBottom: 20,
  },
  mathRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mathLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  mathSub: {
    fontSize: 10,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  mathValue: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.voltOrange,
  },
  barTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  qtyGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.bgCard,
    borderRadius: 14,
    paddingVertical: 10,
  },
  qtyBox: {
    alignItems: 'center',
  },
  qtyVal: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  qtyLbl: {
    fontSize: 10,
    color: theme.colors.textMuted,
    marginTop: 2,
  },

  // Logging Card Section
  loggingCard: {
    backgroundColor: theme.colors.bgInput,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.voltOrange,
    marginBottom: 20,
  },
  loggingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  loggingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  qtyInput: {
    flex: 1,
    backgroundColor: theme.colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 14,
    height: 46,
  },
  stepBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: theme.colors.voltOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoProofBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.bgCard,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: theme.colors.voltOrange,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  photoCapturedBox: {
    borderColor: theme.colors.success,
    borderStyle: 'solid',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  photoProofTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  photoProofSub: {
    fontSize: 10,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  logActionRow: {
    gap: 8,
  },
  submitLogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.voltOrange,
    height: 48,
    borderRadius: 12,
  },
  submitLogBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cancelLogBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  cancelLogBtnText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },

  // Verification Info
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: theme.colors.bgInput,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  infoVal: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'right',
  },
  cadMapShortcutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 14,
    height: 42,
    marginBottom: 20,
  },
  cadMapShortcutText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },

  // Actions
  actionRow: {
    gap: 10,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.voltOrange,
    height: 48,
    borderRadius: 14,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bgInput,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    height: 44,
    borderRadius: 14,
  },
  doneButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
