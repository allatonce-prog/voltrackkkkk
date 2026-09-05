import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ProgressDetailModal } from '../../../components/ProgressDetailModal';
import { ElectricalMilestone } from '../../../types/project';
import { calculateMilestonePercentage } from '../../../utils/progressCalculator';
import { useTheme } from '../../../context/ThemeContext';

interface ProgressTabProps {
  milestones: ElectricalMilestone[];
  onLogProgressWithPhoto?: (
    milestoneId: string,
    addedQuantity: number,
    photoTitle: string
  ) => void;
}

export function ProgressTab({ milestones, onLogProgressWithPhoto }: ProgressTabProps) {
  const { colors } = useTheme();
  const [selectedMilestone, setSelectedMilestone] = useState<ElectricalMilestone | null>(null);

  const activeSelected = milestones.find((m) => m.id === selectedMilestone?.id) || selectedMilestone;

  return (
    <Animated.View entering={FadeInUp.duration(400)} style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Automated Progress Milestones</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Tap any milestone to log progress with photo proof</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {milestones.map((item) => {
          const percent = calculateMilestonePercentage(item);
          const weightPercent = Math.round(item.weightFactor * 100);

          return (
            <Pressable
              key={item.id}
              style={[styles.milestoneCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}
              onPress={() => setSelectedMilestone(item)}
            >
              <View style={styles.topRow}>
                <View style={styles.leftGroup}>
                  <View style={styles.iconBadge}>
                    <Ionicons name={item.icon as any} size={20} color={colors.voltOrange} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.milestoneName, { color: colors.textPrimary }]}>{item.name}</Text>
                    <Text style={[styles.weightText, { color: colors.textMuted }]}>
                      Weight Factor: {weightPercent}% • {item.inspectionStatus === 'verified' ? 'Verified' : 'Pending'}
                    </Text>
                  </View>
                </View>

                <View style={styles.rightGroup}>
                  <Text style={styles.percentText}>{percent}%</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </View>
              </View>

              <View style={styles.metricRow}>
                <Text style={[styles.quantityText, { color: colors.textSecondary }]}>
                  Installed:{' '}
                  <Text style={[styles.qtyHighlight, { color: colors.textPrimary }]}>
                    {item.installedQuantity} / {item.totalPlannedQuantity} {item.unit}
                  </Text>
                </Text>
                <View style={styles.inspectHint}>
                  <Text style={styles.inspectHintText}>+ LOG QUANTITY</Text>
                </View>
              </View>

              <View style={[styles.barTrack, { backgroundColor: colors.bgInput }]}>
                <View style={[styles.barFill, { width: `${percent}%` }]} />
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Progress Detail & Photo Capture Modal */}
      <ProgressDetailModal
        visible={!!selectedMilestone}
        milestone={activeSelected}
        onClose={() => setSelectedMilestone(null)}
        onLogProgressWithPhoto={onLogProgressWithPhoto}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
  },
  listContainer: {
    gap: 12,
  },
  milestoneCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 8,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 85, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  weightText: {
    fontSize: 11,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38BDF8',
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 12,
  },
  qtyHighlight: {
    fontWeight: '700',
  },
  inspectHint: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  inspectHintText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#38BDF8',
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
});
