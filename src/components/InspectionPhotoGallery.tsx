import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SiteInspectionPhoto } from '../types/project';
import { useTheme } from '../context/ThemeContext';

interface InspectionPhotoGalleryProps {
  photos: SiteInspectionPhoto[];
}

export function InspectionPhotoGallery({ photos }: InspectionPhotoGalleryProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>On-Site Geo-Tagged Proof Photos</Text>
        <Text style={[styles.subText, { color: colors.textMuted }]}>{photos.length} Verified Photos</Text>
      </View>

      <View style={styles.photoGrid}>
        {photos.map((item) => (
          <View key={item.id} style={[styles.photoCard, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
            <View style={[styles.imagePlaceholder, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
              <Ionicons name="camera-outline" size={24} color={colors.voltOrange} />
              <Text style={[styles.imagePlaceholderText, { color: colors.textMuted }]}>Site Proof Photo</Text>
            </View>

            <View style={styles.photoInfo}>
              <Text style={[styles.photoTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={11} color={colors.voltOrange} />
                <Text style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {item.location}
                </Text>
              </View>
              <Text style={[styles.timeText, { color: colors.textMuted }]}>
                {item.timestamp} • By {item.engineerName}
              </Text>
            </View>
          </View>
        ))}
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
    letterSpacing: 0.2,
  },
  subText: {
    fontSize: 11,
  },
  photoGrid: {
    gap: 12,
  },
  photoCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 8,
    marginTop: 2,
    fontWeight: '600',
  },
  photoInfo: {
    flex: 1,
  },
  photoTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 11,
  },
  timeText: {
    fontSize: 10,
  },
});
