import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EngineerTab } from '../types/project';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface EngineerBottomNavProps {
  activeTab: EngineerTab;
  onTabChange: (tab: EngineerTab) => void;
}

export function EngineerBottomNav({ activeTab, onTabChange }: EngineerBottomNavProps) {
  const { colors } = useTheme();

  const tabs: { id: EngineerTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'projects', label: 'Projects', icon: 'construct-outline' },
    { id: 'progress', label: 'Progress', icon: 'analytics-outline' },
    { id: 'camera', label: 'Inspect', icon: 'camera-outline' },
    { id: 'sync', label: 'Sync', icon: 'sync-outline' },
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.dockContainer}>
      <View
        style={[
          styles.dockInner,
          { backgroundColor: colors.bgCard, borderColor: colors.borderDefault },
        ]}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={styles.tabItem}
              onPress={() => {
                triggerHaptic.selection();
                onTabChange(tab.id);
              }}
              hitSlop={8}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? colors.voltOrange : colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: colors.textMuted },
                  isActive && { color: colors.voltOrange, fontWeight: '700' },
                ]}
              >
                {tab.label}
              </Text>
              {isActive ? (
                <View style={[styles.activeDot, { backgroundColor: colors.voltOrange }]} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  dockInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    maxWidth: 440,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 3,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: -4,
  },
});
