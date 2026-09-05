import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../theme/theme';

export function VoltLogo() {
  const pulseGlow = useSharedValue(0.4);

  useEffect(() => {
    pulseGlow.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedGlow = useAnimatedStyle(() => ({
    opacity: pulseGlow.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowRing, animatedGlow]} />
      <View style={styles.badge}>
        <Ionicons name="flash" size={32} color={theme.colors.voltOrange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  glowRing: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: theme.colors.voltOrangeGlow,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1.5,
    borderColor: theme.colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 16px rgba(37, 99, 235, 0.4)' } as any)
      : {
          shadowColor: theme.colors.electricBlue,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 8,
        }),
  },
});
