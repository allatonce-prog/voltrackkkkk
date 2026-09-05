import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OfflineSyncStatus } from '../types/project';
import { theme } from '../theme/theme';

interface OfflineSyncBannerProps {
  status: OfflineSyncStatus;
}

export function OfflineSyncBanner({ status }: OfflineSyncBannerProps) {
  return (
    <View style={styles.banner}>
      <View style={styles.leftGroup}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: status.isOnline ? theme.colors.success : '#F59E0B' },
          ]}
        />
        <Text style={styles.statusText}>
          {status.isOnline ? 'Online (SQLite Cloud Sync Active)' : 'Offline Mode (Local Cache Active)'}
        </Text>
      </View>

      <View style={styles.rightGroup}>
        <Ionicons name="cloud-done-outline" size={14} color="#38BDF8" />
        <Text style={styles.syncText}>
          {status.pendingSyncCount === 0
            ? 'All Synced'
            : `${status.pendingSyncCount} Pending`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.bgInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    marginBottom: 20,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38BDF8',
  },
});
