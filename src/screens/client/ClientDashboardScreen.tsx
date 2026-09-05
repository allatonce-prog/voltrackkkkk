import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VoltLogo } from '../../components/VoltLogo';
import { UserAvatarDropdown } from '../../components/UserAvatarDropdown';
import { SettingsModal } from '../../components/SettingsModal';

import { ClientOverviewTab } from './tabs/ClientOverviewTab';
import { ClientGalleryTab } from './tabs/ClientGalleryTab';
import { ClientServiceTab } from './tabs/ClientServiceTab';
import { ClientProfileTab } from './tabs/ClientProfileTab';

import { getStyles } from '../../styles/ClientDashboard.styles';
import { useTheme } from '../../context/ThemeContext';

type ClientTab = 'overview' | 'gallery' | 'services' | 'profile';

interface ClientDashboardScreenProps {
  onLogout: () => void;
  onSwitchRole?: (role: 'engineer' | 'client') => void;
}

export function ClientDashboardScreen({ onLogout, onSwitchRole }: ClientDashboardScreenProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [activeTab, setActiveTab] = useState<ClientTab>('overview');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ClientOverviewTab />;
      case 'gallery':
        return <ClientGalleryTab />;
      case 'services':
        return <ClientServiceTab />;
      case 'profile':
        return <ClientProfileTab onLogout={onLogout} />;
      default:
        return <ClientOverviewTab />;
    }
  };

  const tabs: { id: ClientTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'overview', label: 'Overview', icon: 'pie-chart' },
    { id: 'gallery', label: 'Gallery', icon: 'images' },
    { id: 'services', label: 'Services', icon: 'flash' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <View style={styles.appBar}>
          <View style={styles.brandContainer}>
            <View style={styles.logoBox}>
              <Ionicons name="flash" size={22} color={colors.voltOrange} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.brandVolt}>VOL</Text>
                <Text style={styles.brandTrack}>TRACK</Text>
              </View>
              <View style={styles.roleBadge}>
                <Ionicons name="person" size={10} color={colors.voltOrange} />
                <Text style={styles.roleText}>CLIENT PORTAL</Text>
              </View>
            </View>
          </View>

          <UserAvatarDropdown
            userName="Maria Santos"
            userRole="Property Owner"
            onSelectProfile={() => setActiveTab('profile')}
            onSelectSettings={() => setIsSettingsOpen(true)}
            onLogout={onLogout}
          />
        </View>
      </View>

      {/* Main Tab View Content */}
      <View style={{ flex: 1 }}>{renderActiveTab()}</View>

      {/* Floating Bottom Tab Dock */}
      <View style={styles.tabBarContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={styles.tabButton}
            >
              <View style={[styles.tabIconBox, isActive && styles.tabIconBoxActive]}>
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={isActive ? colors.voltOrange : colors.textMuted}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Shared Reusable Settings Modal */}
      <SettingsModal
        visible={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userRole="Property Owner"
        userName="Maria Santos"
        onSwitchRole={onSwitchRole}
      />
    </SafeAreaView>
  );
}
