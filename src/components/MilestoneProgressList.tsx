import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ElectricalMilestone } from '../types/project';
import { calculateMilestonePercentage } from '../utils/progressCalculator';
import { theme } from '../theme/theme';

interface MilestoneProgressListProps {
  milestones: ElectricalMilestone[];
  onIncrementQuantity?: (milestoneId: string) => void;
}

export function MilestoneProgressList({
  milestones,
  onIncrementQuantity,
}: MilestoneProgressListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Electrical Work Milestones</Text>
        <Text style={styles.subText}>5 Milestones (Task-Weightage)</Text>
      </View>

      <View style={styles.listContainer}>
        {milestones.map((item) => {
          const percent = calculateMilestonePercentage(item);
          const weightPercent = Math.round(item.weightFactor * 100);

          return (
            <View key={item.id} style={styles.milestoneCard}>
              <View style={styles.topRow}>
                <View style={styles.leftGroup}>
                  <View style={styles.iconBadge}>
                    <Ionicons name={item.icon} size={18} color={theme.colors.voltOrange} />
                  </View>
                  <View>
                    <Text style={styles.milestoneName}>{item.name}</Text>
                    <Text style={styles.weightText}>Weight Factor: {weightPercent}%</Text>
                  </View>
                </View>

                <View style={styles.rightGroup}>
                  <Text style={styles.percentText}>{percent}%</Text>
                </View>
              </View>

              {/* Progress Bar & Quantities */}
              <View style={styles.metricRow}>
                <Text style={styles.quantityText}>
                  Installed: <Text style={styles.qtyHighlight}>{item.installedQuantity}</Text> / {item.totalPlannedQuantity} {item.unit}
                </Text>
                {onIncrementQuantity && percent < 100 ? (
                  <Pressable
                    style={styles.addButton}
                    onPress={() => onIncrementQuantity(item.id)}
                    hitSlop={6}
                  >
                    <Ionicons name="add" size={14} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Log Progress</Text>
                  </Pressable>
                ) : null}
              </View>

              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${percent}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },
  subText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  listContainer: {
    gap: 12,
  },
  milestoneCard: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 85, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  weightText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  rightGroup: {
    alignItems: 'flex-end',
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
    color: theme.colors.textSecondary,
  },
  qtyHighlight: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.voltOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  barTrack: {
    height: 6,
    backgroundColor: theme.colors.bgInput,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
});
