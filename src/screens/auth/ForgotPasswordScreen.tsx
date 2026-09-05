import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { VoltLogo } from '../../components/VoltLogo';
import { CustomInput } from '../../components/CustomInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ForgotPasswordValues, ForgotPasswordErrors } from '../../types/auth';
import { validateForgotPasswordForm } from '../../utils/validation';
import { styles } from '../../styles/ForgotPasswordScreen.styles';
import { theme } from '../../theme/theme';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [values, setValues] = useState<ForgotPasswordValues>({ email: '' });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const shakeOffset = useSharedValue(0);

  const triggerShakeAnimation = () => {
    shakeOffset.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-4, { duration: 50 }),
      withTiming(4, { duration: 50 }),
      withSpring(0, theme.spring)
    );
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  const handleSubmit = () => {
    const validationErrors = validateForgotPasswordForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      triggerShakeAnimation();
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* Brand Header */}
      <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.header}>
        <VoltLogo />
        <View style={styles.titleRow}>
          <Text style={styles.titleVolt}>VOL</Text>
          <Text style={styles.titleTrack}>TRACK</Text>
        </View>
        <Text style={styles.subtitle}>Account Recovery</Text>
      </Animated.View>

      {/* Main Form / Success Card */}
      <Animated.View
        entering={FadeInUp.delay(120).duration(500).springify()}
        style={[styles.card, animatedCardStyle]}
      >
        {!isSubmitted ? (
          <>
            <Text style={styles.instructionText}>
              Enter your work email address and we'll send you instructions to reset your password.
            </Text>

            <CustomInput
              label="Email"
              value={values.email}
              onChangeText={(text) => {
                setValues({ email: text });
                if (errors.email) setErrors({});
              }}
              placeholder="name@example.com"
              iconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <PrimaryButton
              title="SEND RESET LINK"
              onPress={handleSubmit}
              isLoading={isLoading}
            />

            <Pressable style={styles.backButton} onPress={onBackToLogin} hitSlop={8}>
              <Ionicons name="arrow-back" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.backButtonText}>Back to Login</Text>
            </Pressable>
          </>
        ) : (
          <Animated.View entering={FadeInUp.duration(400)} style={styles.successContainer}>
            <View style={styles.successIconBadge}>
              <Ionicons name="checkmark-circle" size={36} color={theme.colors.success} />
            </View>

            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successDescription}>
              We have sent password reset instructions to{' '}
              <Text style={styles.emailHighlight}>{values.email}</Text>.
            </Text>

            <PrimaryButton title="BACK TO LOGIN" onPress={onBackToLogin} />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}
