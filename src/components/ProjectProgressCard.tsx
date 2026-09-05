import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ContractedProject } from '../types/project';
import { calculateProjectProgress } from '../utils/progressCalculator';
import { useTheme } from '../context/ThemeContext';

interface ProjectProgressCardProps {
  project: ContractedProject;
}

export function ProjectProgressCard({ project }: ProjectProgressCardProps) {
  const { colors } = useTheme();
  const overallProgress = calculateProjectProgress(project.milestones);

  return (
    <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
      <View style={styles.headerRow}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Contracted Project</Text>
        </View>
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.statusText, { color: colors.success }]}>In Progress</Text>
        </View>
      </View>

      <Text style={[styles.projectTitle, { color: colors.textPrimary }]}>{project.title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location" size={13} color={colors.voltOrange} />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>{project.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={13} color="#38BDF8" />
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>Target: {project.targetCompletionDate}</Text>
        </View>
      </View>

      {/* Progress Calculation Display */}
      <View style={[styles.progressContainer, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
        <View style={styles.progressTextRow}>
          <View style={styles.progressTitleGroup}>
            <Ionicons name="calculator-outline" size={16} color="#38BDF8" />
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Automated Progress Estimation</Text>
          </View>
          <Text style={[styles.progressValue, { color: colors.voltOrange }]}>{overallProgress}%</Text>
        </View>

        <View style={[styles.progressBarTrack, { backgroundColor: colors.borderDefault }]}>
          <View style={[styles.progressBarFill, { width: `${overallProgress}%`, backgroundColor: colors.voltOrange }]} />
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>Client: {project.clientName}</Text>
        <Text style={[styles.footerText, { color: colors.textMuted }]}>Contractor: {project.contractor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)' } as any)
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 8,
        }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeContainer: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  projectTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 25,
  },
  metaRow: {
    gap: 6,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
  },
  progressTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  footerRow: {
    gap: 2,
    paddingTop: 2,
  },
  footerText: {
    fontSize: 11,
  },
});
