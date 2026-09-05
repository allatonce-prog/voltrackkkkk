import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getStyles } from '../../../styles/ClientDashboard.styles';
import { useTheme } from '../../../context/ThemeContext';

export function ClientGalleryTab() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  const photos = [
    {
      id: '1',
      title: 'Main Panelboard Busbar & Breaker Assembly',
      date: 'Sept 5, 2026 - 02:45 PM',
      location: 'Sector A - Main Distribution Board',
      inspector: 'Engr. J. Dela Cruz',
      verified: true,
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'Conduit Run & PVC Junction Box Wire Pulling',
      date: 'Sept 4, 2026 - 10:15 AM',
      location: 'Sector B - 2nd Floor Ceiling Void',
      inspector: 'Engr. M. Santos',
      verified: true,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Grounding Rod & Copper Wire Connection',
      date: 'Sept 2, 2026 - 04:20 PM',
      location: 'Exterior Ground Pit 1',
      inspector: 'Engr. J. Dela Cruz',
      verified: true,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="images" size={20} color={colors.voltOrange} />
            <Text style={styles.cardTitle}>Verified Site Photo Proofs</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 12 }}>
          Geo-tagged and inspector-authenticated photos captured directly on site in Tagum City.
        </Text>
      </Animated.View>

      {photos.map((item, idx) => (
        <Animated.View
          key={item.id}
          entering={FadeInDown.delay(100 * (idx + 1)).duration(500)}
          style={styles.card}
        >
          <View style={{ borderRadius: 12, overflow: 'hidden', height: 180, marginBottom: 12, backgroundColor: colors.bgInput }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
            <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(5, 9, 20, 0.85)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.4)' }}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={{ color: colors.success, fontSize: 10, fontWeight: '800' }}>VERIFIED PROOF</Text>
            </View>
          </View>

          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{item.title}</Text>

          <View style={{ gap: 4, marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="location-outline" size={14} color="#38BDF8" />
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item.location}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={{ fontSize: 12, color: colors.textMuted }}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="shield-checkmark-outline" size={14} color={colors.voltOrange} />
              <Text style={{ fontSize: 12, color: colors.voltOrange, fontWeight: '600' }}>Inspector: {item.inspector}</Text>
            </View>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
