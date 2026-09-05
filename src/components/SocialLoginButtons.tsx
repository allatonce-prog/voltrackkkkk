import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface SocialLoginButtonsProps {
  onSelectSocial?: (provider: 'google' | 'apple' | 'facebook') => void;
}

export function SocialLoginButtons({ onSelectSocial }: SocialLoginButtonsProps) {
  const { colors } = useTheme();

  const handlePress = (provider: 'google' | 'apple' | 'facebook') => {
    triggerHaptic.light();
    if (onSelectSocial) {
      onSelectSocial(provider);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <View style={[styles.dividerLine, { backgroundColor: colors.borderDefault }]} />
        <Text style={[styles.dividerText, { color: colors.textMuted }]}>Or continue with</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.borderDefault }]} />
      </View>

      {/* Circular Social Buttons Row */}
      <View style={styles.buttonsRow}>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: colors.bgInput, borderColor: colors.borderDefault, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => handlePress('google')}
          hitSlop={6}
        >
          <Ionicons name="logo-google" size={20} color="#EA4335" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: colors.bgInput, borderColor: colors.borderDefault, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => handlePress('apple')}
          hitSlop={6}
        >
          <Ionicons name="logo-apple" size={22} color={colors.textPrimary} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: colors.bgInput, borderColor: colors.borderDefault, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={() => handlePress('facebook')}
          hitSlop={6}
        >
          <Ionicons name="logo-facebook" size={22} color="#1877F2" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    alignItems: 'center',
    width: '100%',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});
