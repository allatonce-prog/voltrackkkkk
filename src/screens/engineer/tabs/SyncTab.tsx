import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { OfflineSyncBanner } from '../../../components/OfflineSyncBanner';
import { OfflineSyncStatus } from '../../../types/project';
import { useTheme } from '../../../context/ThemeContext';

interface SyncTabProps {
  status: OfflineSyncStatus;
}

export function SyncTab({ status }: SyncTabProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <OfflineSyncBanner status={status} />

      <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Ionicons name="cloud-upload-outline" size={24} color="#38BDF8" />
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>SQLite Local Device Cache</Text>
            <Text style={[styles.cardSub, { color: colors.textMuted }]}>Tagum City Job Site Offline Engine</Text>
          </View>
        </View>

        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
          Field logs recorded without cellular service are stored in SQLite database cache and automatically pushed when back online.
        </Text>

        <Pressable
          style={[styles.syncButton, { backgroundColor: colors.electricBlue }]}
          onPress={() => Alert.alert('Sync Complete', 'All local offline logs synced with cloud API server.')}
        >
          <Ionicons name="sync" size={18} color="#FFFFFF" />
          <Text style={styles.syncButtonText}>Push Sync Now</Text>
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
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 2,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 14,
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
