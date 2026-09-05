import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getStyles } from '../../../styles/ClientDashboard.styles';
import { useTheme } from '../../../context/ThemeContext';

interface ClientProfileTabProps {
  onLogout?: () => void;
}

export function ClientProfileTab({ onLogout }: ClientProfileTabProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {/* Profile Header */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255, 85, 0, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.voltOrange }}>
            <Ionicons name="person" size={30} color={colors.voltOrange} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: colors.textPrimary }}>Maria Santos</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>Tagum Commercial Holdings</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <View style={{ backgroundColor: 'rgba(255, 85, 0, 0.18)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                <Text style={{ color: colors.voltOrange, fontSize: 10, fontWeight: '800' }}>PROPERTY OWNER ROLE</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Contract & Property Details */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>Active Contract Information</Text>

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.borderDefault }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>Contract No.</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>VT-2026-TAG-009</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.borderDefault }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>Project Site</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#38BDF8' }}>Tagum City Mall Unit 4B</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.borderDefault }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>Assigned Inspector</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>Engr. J. Dela Cruz (REE)</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>Office Location</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>Tagum City, Davao del Norte</Text>
          </View>
        </View>
      </Animated.View>

      {/* Support & Logout */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.card}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>Account & Help</Text>

        <View style={{ gap: 10 }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: colors.bgInput, borderRadius: 12, borderWidth: 1, borderColor: colors.borderDefault }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="help-circle-outline" size={20} color="#38BDF8" />
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary }}>VoltTrack Support & FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>

          <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: colors.bgInput, borderRadius: 12, borderWidth: 1, borderColor: colors.borderDefault }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="document-text-outline" size={20} color={colors.voltOrange} />
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary }}>Download Electrical BOQ & Specs</Text>
            </View>
            <Ionicons name="download-outline" size={16} color={colors.voltOrange} />
          </Pressable>

          <Pressable
            onPress={onLogout}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 14,
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(239, 68, 68, 0.3)',
              gap: 8,
              marginTop: 10,
            }}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.error} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: colors.error }}>LOGOUT FROM CLIENT PORTAL</Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
