import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { InspectionPhotoGallery } from '../../../components/InspectionPhotoGallery';
import { SiteInspectionPhoto } from '../../../types/project';
import { useTheme } from '../../../context/ThemeContext';

interface InspectTabProps {
  photos: SiteInspectionPhoto[];
}

export function InspectTab({ photos }: InspectTabProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <View style={[styles.captureCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
        <View style={styles.iconCircle}>
          <Ionicons name="camera-outline" size={28} color={colors.voltOrange} />
        </View>
        <Text style={[styles.captureTitle, { color: colors.textPrimary }]}>Capture On-Site Inspection Proof</Text>
        <Text style={[styles.captureSub, { color: colors.textSecondary }]}>
          Geo-tagged site photos verify completed electrical milestones for Tagum City project reports.
        </Text>
        <Pressable
          style={[styles.captureButton, { backgroundColor: colors.voltOrange }]}
          onPress={() => Alert.alert('Camera Opened', 'Capturing on-site photo with GPS location metadata...')}
        >
          <Ionicons name="camera" size={18} color="#FFFFFF" />
          <Text style={styles.captureButtonText}>Take On-Site Photo</Text>
        </Pressable>
      </View>

      <InspectionPhotoGallery photos={photos} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  captureCard: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 85, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  captureTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  captureSub: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
