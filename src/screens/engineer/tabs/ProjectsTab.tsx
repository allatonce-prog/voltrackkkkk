import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ProjectProgressCard } from '../../../components/ProjectProgressCard';
import { CADBlueprintModal } from '../../../components/CADBlueprintModal';
import { SkeletonProjectHero, SkeletonKpiGrid, SkeletonCard } from '../../../components/SkeletonLoader';
import { ContractedProject } from '../../../types/project';
import { useTheme } from '../../../context/ThemeContext';

interface ProjectsTabProps {
  project: ContractedProject;
  isLoading?: boolean;
}

export function ProjectsTab({ project, isLoading = false }: ProjectsTabProps) {
  const { colors } = useTheme();
  const [isCadModalOpen, setIsCadModalOpen] = useState(false);

  if (isLoading) {
    return (
      <View>
        <SkeletonProjectHero />
        <SkeletonKpiGrid />
        <SkeletonCard />
      </View>
    );
  }

  const kpis = [
    {
      id: 'k1',
      title: 'Milestones Verified',
      value: '3 / 5',
      sub: '60% Completed',
      icon: 'checkmark-done-circle-outline' as const,
      color: colors.success,
    },
    {
      id: 'k2',
      title: 'Installed Quantity',
      value: '483',
      sub: 'Meters & Units',
      icon: 'construct-outline' as const,
      color: colors.voltOrange,
    },
    {
      id: 'k3',
      title: 'Geo-Tagged Proofs',
      value: '100%',
      sub: 'Location Verified',
      icon: 'shield-checkmark-outline' as const,
      color: '#38BDF8',
    },
    {
      id: 'k4',
      title: 'Days Remaining',
      value: '42',
      sub: 'Target Oct 15',
      icon: 'time-outline' as const,
      color: '#A855F7',
    },
  ];

  const boqBreakdown = [
    { name: 'Conduit Laying (E-CONDUIT Layer)', percent: 100, installed: '150m / 150m' },
    { name: 'Wire Pulling (E-WIRING Layer)', percent: 80, installed: '280m / 350m' },
    { name: 'Panelboard Installation (E-PANEL Layer)', percent: 80, installed: '8 / 10 Panels' },
    { name: 'Lighting Fixtures (E-LIGHT Layer)', percent: 50, installed: '45 / 90 Units' },
    { name: 'Testing & Commissioning', percent: 0, installed: '0 / 5 Circuits' },
  ];

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      {/* Contracted Electrical Project Hero Summary */}
      <ProjectProgressCard project={project} />

      {/* Analytics KPI Grid */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Project Analytics & Key Performance Indicators</Text>
      <View style={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
            <View style={[styles.kpiIconBox, { backgroundColor: kpi.color + '1A' }]}>
              <Ionicons name={kpi.icon} size={20} color={kpi.color} />
            </View>
            <Text style={[styles.kpiValue, { color: colors.textPrimary }]}>{kpi.value}</Text>
            <Text style={[styles.kpiTitle, { color: colors.textSecondary }]}>{kpi.title}</Text>
            <Text style={[styles.kpiSub, { color: colors.textMuted }]}>{kpi.sub}</Text>
          </View>
        ))}
      </View>

      {/* CAD Bill of Quantities (BOQ) Breakdown */}
      <View style={[styles.boqCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <View style={styles.boqHeaderRow}>
          <View style={styles.boqHeaderLeft}>
            <View style={styles.boqIconBox}>
              <Ionicons name="document-text-outline" size={20} color="#38BDF8" />
            </View>
            <View>
              <Text style={[styles.boqTitle, { color: colors.textPrimary }]}>CAD Bill of Quantities (BOQ) Status</Text>
              <Text style={[styles.boqSub, { color: colors.textMuted }]}>Parsed Vector Layer Progress</Text>
            </View>
          </View>

          {/* Trigger CAD Blueprint Drawing Viewer */}
          <Pressable
            style={[styles.viewCadButton, { backgroundColor: colors.electricBlue }]}
            onPress={() => setIsCadModalOpen(true)}
          >
            <Ionicons name="map-outline" size={14} color="#FFFFFF" />
            <Text style={styles.viewCadButtonText}>View CAD Map</Text>
          </Pressable>
        </View>

        <View style={styles.boqList}>
          {boqBreakdown.map((item, idx) => (
            <View key={idx} style={styles.boqItem}>
              <View style={styles.boqItemHeader}>
                <Text style={[styles.boqItemName, { color: colors.textSecondary }]}>{item.name}</Text>
                <Text style={[styles.boqItemQty, { color: colors.textPrimary }]}>{item.installed}</Text>
              </View>
              <View style={[styles.boqBarTrack, { backgroundColor: colors.bgInput }]}>
                <View style={[styles.boqBarFill, { width: `${item.percent}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Action Shortcuts */}
      <View style={[styles.actionsCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <Text style={[styles.actionSectionTitle, { color: colors.textSecondary }]}>On-Site Field Actions</Text>
        <View style={styles.actionButtonsRow}>
          <Pressable
            style={[styles.actionBtnPrimary, { backgroundColor: colors.voltOrange }]}
            onPress={() => setIsCadModalOpen(true)}
          >
            <Ionicons name="map-outline" size={18} color="#FFFFFF" />
            <Text style={styles.actionBtnPrimaryText}>CAD Blueprint</Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtnSecondary, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}
            onPress={() => Alert.alert('Capture Photo', 'Opening camera for site photo verification.')}
          >
            <Ionicons name="camera-outline" size={18} color="#38BDF8" />
            <Text style={styles.actionBtnSecondaryText}>Site Proof</Text>
          </Pressable>
        </View>
      </View>

      {/* CAD Blueprint Drawing Viewer Modal */}
      <CADBlueprintModal
        visible={isCadModalOpen}
        onClose={() => setIsCadModalOpen(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    minWidth: '46%',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
  },
  kpiIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 2,
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  kpiSub: {
    fontSize: 10,
  },
  boqCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  boqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boqHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  boqIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boqTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  boqSub: {
    fontSize: 11,
    marginTop: 2,
  },
  viewCadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewCadButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  boqList: {
    gap: 12,
  },
  boqItem: {
    gap: 6,
  },
  boqItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boqItemName: {
    fontSize: 12,
    fontWeight: '600',
  },
  boqItemQty: {
    fontSize: 12,
    fontWeight: '700',
  },
  boqBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  boqBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  actionsCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  actionSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    borderRadius: 12,
  },
  actionBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    height: 44,
    borderRadius: 12,
  },
  actionBtnSecondaryText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
});
