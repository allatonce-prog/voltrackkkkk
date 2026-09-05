import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { UserAvatarDropdown } from '../../components/UserAvatarDropdown';
import { EngineerBottomNav } from '../../components/EngineerBottomNav';
import { SettingsModal } from '../../components/SettingsModal';

// Modular Tab Screens
import { ProjectsTab } from './tabs/ProjectsTab';
import { ProgressTab } from './tabs/ProgressTab';
import { InspectTab } from './tabs/InspectTab';
import { SyncTab } from './tabs/SyncTab';
import { ProfileTab } from './tabs/ProfileTab';

import {
  ContractedProject,
  SiteInspectionPhoto,
  OfflineSyncStatus,
  EngineerTab,
} from '../../types/project';
import { getStyles } from '../../styles/EngineerDashboard.styles';
import { useTheme } from '../../context/ThemeContext';

interface EngineerDashboardScreenProps {
  onLogout: () => void;
  onSwitchRole?: (role: 'engineer' | 'client') => void;
}

export function EngineerDashboardScreen({ onLogout, onSwitchRole }: EngineerDashboardScreenProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [activeTab, setActiveTab] = useState<EngineerTab>('projects');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [project, setProject] = useState<ContractedProject>({
    id: 'p-001',
    title: 'Tagum Commercial Center Electrical Rewiring & Panelboard Upgrade',
    clientName: 'City Engineering Office / Tagum Enterprise',
    location: 'Mabini Street, Tagum City, Davao del Norte',
    contractor: 'Mindanao Electrical Contracting Corp.',
    startDate: '2026-08-01',
    targetCompletionDate: '2026-10-15',
    status: 'in_progress',
    milestones: [
      {
        id: 'm1',
        name: 'Rough-in Conduit Laying',
        category: 'conduit',
        weightFactor: 0.25, // 25%
        installedQuantity: 150,
        totalPlannedQuantity: 150,
        unit: 'meters',
        icon: 'git-network-outline',
        inspectionStatus: 'verified',
        inspectorName: 'J. Afable (Field Engineer)',
        lastVerifiedTimestamp: '2026-09-02 11:15',
        locationCoordinates: 'Tagum Commercial Site Ground Floor',
        proofPhotoTitle: 'Conduit Pathway Laying Verification',
      },
      {
        id: 'm2',
        name: 'Cable & Wire Pulling',
        category: 'wiring',
        weightFactor: 0.25, // 25%
        installedQuantity: 280,
        totalPlannedQuantity: 350,
        unit: 'meters',
        icon: 'git-commit-outline',
        inspectionStatus: 'verified',
        inspectorName: 'E. Seguido (Site Inspector)',
        lastVerifiedTimestamp: '2026-09-03 10:45',
        locationCoordinates: 'Mabini St., Tagum City Substation',
        proofPhotoTitle: '3-Phase Cable Laying Log',
      },
      {
        id: 'm3',
        name: 'Panelboard & Breakers Installation',
        category: 'panelboard',
        weightFactor: 0.20, // 20%
        installedQuantity: 8,
        totalPlannedQuantity: 10,
        unit: 'panels',
        icon: 'hardware-chip-outline',
        inspectionStatus: 'verified',
        inspectorName: 'J. Afable (Field Engineer)',
        lastVerifiedTimestamp: '2026-09-03 14:30',
        locationCoordinates: 'Tagum Commercial Main Distribution Room',
        proofPhotoTitle: 'Main Distribution Panelboard Wiring',
      },
      {
        id: 'm4',
        name: 'Lighting & Device Fixtures',
        category: 'fixtures',
        weightFactor: 0.20, // 20%
        installedQuantity: 45,
        totalPlannedQuantity: 90,
        unit: 'units',
        icon: 'bulb-outline',
        inspectionStatus: 'pending_inspection',
        inspectorName: 'J. Chatto (Project Manager)',
        lastVerifiedTimestamp: '2026-09-03 16:00',
        locationCoordinates: 'Tagum Commercial Center 2nd Floor',
        proofPhotoTitle: 'Duplex Outlet & LED Fixtures Log',
      },
      {
        id: 'm5',
        name: 'Testing & Circuit Commissioning',
        category: 'commissioning',
        weightFactor: 0.10, // 10%
        installedQuantity: 0,
        totalPlannedQuantity: 5,
        unit: 'circuits',
        icon: 'shield-checkmark-outline',
        inspectionStatus: 'pending_inspection',
        inspectorName: 'E. Seguido (Site Inspector)',
        lastVerifiedTimestamp: 'Pending Schedule',
        locationCoordinates: 'Tagum City Electrical Grid Node',
        proofPhotoTitle: 'Final Load Balance & Breaker Test',
      },
    ],
  });

  const [photos, setPhotos] = useState<SiteInspectionPhoto[]>([
    {
      id: 'ph-1',
      milestoneId: 'm3',
      title: 'Main Distribution Panelboard Wiring',
      photoUrl: '',
      timestamp: '2026-09-03 14:30',
      location: 'Mabini St., Tagum City (Lat 7.447, Long 125.808)',
      engineerName: 'J. Afable (Field Engineer)',
    },
    {
      id: 'ph-2',
      milestoneId: 'm1',
      title: 'Conduit Pathway Laying Verification',
      photoUrl: '',
      timestamp: '2026-09-02 11:15',
      location: 'Tagum Commercial Site Ground Floor',
      engineerName: 'E. Seguido (Site Inspector)',
    },
  ]);

  const syncStatus: OfflineSyncStatus = {
    isOnline: true,
    pendingSyncCount: 0,
    lastSyncedTimestamp: '2026-09-03 22:50',
  };

  const handleLogProgressWithPhoto = (
    milestoneId: string,
    addedQuantity: number,
    photoTitle: string
  ) => {
    const timestampStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    // 1. Update project milestone quantities
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => {
        if (m.id === milestoneId) {
          const nextQty = Math.min(
            m.totalPlannedQuantity,
            m.installedQuantity + addedQuantity
          );
          return {
            ...m,
            installedQuantity: nextQty,
            inspectionStatus: 'verified',
            lastVerifiedTimestamp: timestampStr,
            proofPhotoTitle: photoTitle,
          };
        }
        return m;
      }),
    }));

    // 2. Add photo proof record to inspection stream
    const newPhotoRecord: SiteInspectionPhoto = {
      id: `ph-${Date.now()}`,
      milestoneId,
      title: photoTitle,
      photoUrl: '',
      timestamp: timestampStr,
      location: 'Mabini St., Tagum City (Lat 7.447, Long 125.808)',
      engineerName: 'John Andrei (Field Engineer)',
    };

    setPhotos((prev) => [newPhotoRecord, ...prev]);

    Alert.alert(
      'Progress & Photo Logged',
      'Installed quantity updated and geo-tagged photo proof submitted. Automated Progress Engine recalculated overall completion percentage.'
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsTab project={project} />;
      case 'progress':
        return (
          <ProgressTab
            milestones={project.milestones}
            onLogProgressWithPhoto={handleLogProgressWithPhoto}
          />
        );
      case 'camera':
        return <InspectTab photos={photos} />;
      case 'sync':
        return <SyncTab status={syncStatus} />;
      case 'profile':
        return <ProfileTab onLogout={onLogout} />;
      default:
        return <ProjectsTab project={project} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* App Bar Header with UserAvatarDropdown */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.appBar}>
          <View style={styles.brandContainer}>
            <View style={styles.logoBox}>
              <Ionicons name="flash" size={22} color={colors.voltOrange} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.brandVolt}>VOL</Text>
                <Text style={styles.brandTrack}>TRACK</Text>
              </View>
              <Text style={styles.roleText}>Field Engineer Portal • Tagum City</Text>
            </View>
          </View>

          {/* User Avatar Dropdown Header Component */}
          <UserAvatarDropdown
            userName="John Andrei"
            userRole="Field Engineer"
            onSelectProfile={() => setActiveTab('profile')}
            onSelectSettings={() => setIsSettingsOpen(true)}
            onLogout={onLogout}
          />
        </Animated.View>

        {/* Dynamic Tab Content */}
        {renderActiveTabContent()}
      </ScrollView>

      {/* Field Engineer Bottom Navigation Dock */}
      <EngineerBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Shared Reusable Settings Modal */}
      <SettingsModal
        visible={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userRole="Field Engineer"
        userName="John Andrei"
        onSwitchRole={onSwitchRole}
      />
    </View>
  );
}
