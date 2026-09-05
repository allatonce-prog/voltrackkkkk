import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getStyles } from '../../../styles/ClientDashboard.styles';
import { useTheme } from '../../../context/ThemeContext';
import { SkeletonProjectHero, SkeletonCard } from '../../../components/SkeletonLoader';

interface ClientOverviewTabProps {
  isLoading?: boolean;
}

export function ClientOverviewTab({ isLoading = false }: ClientOverviewTabProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <SkeletonProjectHero />
        <SkeletonCard />
      </View>
    );
  }

  const phases = [
    { title: 'Conduits & Boxes Installation', percent: 100, status: 'Completed', color: colors.success },
    { title: 'Feeder & Branch Wiring', percent: 65, status: 'In Progress', color: '#38BDF8' },
    { title: 'Main Distribution Panelboard', percent: 50, status: 'In Progress', color: colors.voltOrange },
    { title: 'Lighting Fixtures & Outlets', percent: 30, status: 'Scheduled', color: '#F59E0B' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {/* Overview Ring Header */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="pie-chart" size={20} color={colors.voltOrange} />
            <Text style={styles.cardTitle}>Overall Project Status</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' }}>
            <Text style={{ color: colors.success, fontSize: 11, fontWeight: '700' }}>ON SCHEDULE</Text>
          </View>
        </View>

        <View style={styles.gaugeContainer}>
          <View style={styles.gaugeRingOuter}>
            <View style={styles.gaugeRingActive} />
            <Text style={styles.gaugeValue}>68%</Text>
            <Text style={styles.gaugeLabel}>Completed</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.borderDefault }}>
          <View>
            <Text style={{ fontSize: 11, color: colors.textMuted }}>CONTRACTOR</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginTop: 2 }}>VoltTrack Engineering</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, color: colors.textMuted }}>TARGET COMPLETION</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#38BDF8', marginTop: 2 }}>Oct 15, 2026</Text>
          </View>
        </View>
      </Animated.View>

      {/* Phase Breakdown */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="layers-outline" size={20} color="#38BDF8" />
            <Text style={styles.cardTitle}>Electrical Installation Phases</Text>
          </View>
        </View>

        {phases.map((item, idx) => (
          <View key={idx} style={styles.phaseItem}>
            <View style={styles.phaseHeader}>
              <Text style={styles.phaseTitle}>{item.title}</Text>
              <Text style={[styles.phasePercent, { color: item.color }]}>{item.percent}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
      </Animated.View>

      {/* Property Owner Quick Action */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(56, 189, 248, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Ionicons name="call" size={20} color="#38BDF8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>Need Inspector Assistance?</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>Contact lead site engineer Engr. Juan Dela Cruz</Text>
          </View>
          <Pressable style={{ backgroundColor: '#38BDF8', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 }}>
            <Text style={{ color: '#050914', fontSize: 12, fontWeight: '800' }}>CALL</Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
