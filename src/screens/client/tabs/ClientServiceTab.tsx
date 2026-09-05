import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getStyles } from '../../../styles/ClientDashboard.styles';
import { useTheme } from '../../../context/ThemeContext';

export function ClientServiceTab() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  const [serviceType, setServiceType] = useState('Rewiring & Upgrade');
  const [address, setAddress] = useState('Mabini St., Tagum City, Davao del Norte');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Rewiring & Upgrade',
    'Main Panelboard Install',
    'Safety Inspection',
    'Solar & Auxiliary Wiring',
  ];

  const handleSubmitRequest = () => {
    setSubmitted(true);
    if (Platform.OS !== 'web') {
      Alert.alert('Service Request Sent', 'Your electrical service request has been transmitted to VoltTrack Tagum Branch.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="flash" size={20} color={colors.voltOrange} />
            <Text style={styles.cardTitle}>Electrical Service Procurement</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 14 }}>
          Book a licensed electrical contractor for your commercial or residential property in Tagum City.
        </Text>

        {submitted ? (
          <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={36} color={colors.success} />
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginTop: 8 }}>Request Submitted!</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: 4 }}>
              Reference ID: #VT-REQ-8821. An inspector from VoltTrack Tagum will contact you within 24 hours.
            </Text>
            <Pressable
              onPress={() => setSubmitted(false)}
              style={{ marginTop: 12, backgroundColor: colors.bgInput, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: colors.borderDefault }}
            >
              <Text style={{ color: '#38BDF8', fontSize: 12, fontWeight: '700' }}>Submit Another Request</Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ gap: 14 }}>
            {/* Service Type Selection */}
            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 8 }}>SELECT SERVICE TYPE</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {serviceOptions.map((opt) => (
                  <Pressable
                    key={opt}
                    onPress={() => setServiceType(opt)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 10,
                      backgroundColor: serviceType === opt ? 'rgba(255, 85, 0, 0.18)' : colors.bgInput,
                      borderWidth: 1,
                      borderColor: serviceType === opt ? colors.voltOrange : colors.borderDefault,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: serviceType === opt ? '700' : '500',
                        color: serviceType === opt ? colors.voltOrange : colors.textSecondary,
                      }}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Address Input */}
            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 6 }}>TAGUM CITY SITE ADDRESS</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgInput, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.borderDefault }}>
                <Ionicons name="location-outline" size={18} color={colors.textMuted} />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  style={{ flex: 1, color: colors.textPrimary, paddingVertical: 10, paddingLeft: 8, fontSize: 13 }}
                  placeholder="Enter property address in Tagum City"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            {/* Notes Input */}
            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 6 }}>SERVICE SPECIFICATIONS / NOTES</Text>
              <View style={{ backgroundColor: colors.bgInput, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: colors.borderDefault }}>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  style={{ color: colors.textPrimary, fontSize: 13, height: 60, textAlignVertical: 'top' }}
                  placeholder="E.g., Require 3-phase line installation, replacement of main breaker..."
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            <Pressable
              onPress={handleSubmitRequest}
              style={{
                backgroundColor: colors.voltOrange,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                marginTop: 6,
              }}
            >
              <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '800' }}>SUBMIT SERVICE REQUEST</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>

      {/* Previous Requests */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 }}>Request History</Text>
        <View style={{ padding: 12, backgroundColor: colors.bgInput, borderRadius: 12, borderWidth: 1, borderColor: colors.borderDefault, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>#VT-REQ-7910 - Feeder Wire Inspection</Text>
            <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Aug 28, 2026 • Tagum Commercial Complex</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: '#38BDF8' }}>COMPLETED</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
