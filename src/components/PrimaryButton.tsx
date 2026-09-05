import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PrimaryButtonProps } from '../types/auth';
import { theme } from '../theme/theme';
import { triggerHaptic } from '../utils/haptics';

export function PrimaryButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !isLoading) {
      triggerHaptic.medium();
      scale.value = withSpring(0.96, theme.spring);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, theme.spring);
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || isLoading}
        style={[styles.button, disabled && styles.disabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.voltOrange,
    borderRadius: 26,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 20px rgba(255, 107, 0, 0.35)' } as any)
      : {
          shadowColor: theme.colors.voltOrange,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 6,
        }),
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: '#475569',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: 'none' } as any)
      : {
          shadowOpacity: 0,
        }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
