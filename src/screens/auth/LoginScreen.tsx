import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
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
import { LoginFormValues, LoginFormErrors, UserRole } from '../../types/auth';
import { getStyles } from '../../styles/LoginScreen.styles';
import { useTheme } from '../../context/ThemeContext';

interface LoginScreenProps {
  onNavigateToForgotPassword?: () => void;
  onLoginSuccess?: (role: UserRole) => void;
}

export function LoginScreen({ onNavigateToForgotPassword, onLoginSuccess }: LoginScreenProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [selectedRole, setSelectedRole] = useState<UserRole>('engineer');
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const shakeOffset = useSharedValue(0);

  const triggerShakeAnimation = () => {
    shakeOffset.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-4, { duration: 50 }),
      withTiming(4, { duration: 50 }),
      withSpring(0, { damping: 15, stiffness: 180, mass: 0.5 })
    );
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  const handleInputChange = (field: keyof LoginFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = (role: UserRole = selectedRole) => {
    if (onLoginSuccess) {
      onLoginSuccess(role);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* Brand Header */}
      <Animated.View
        entering={FadeInDown.duration(600).springify()}
        style={styles.brandHeader}
      >
        <VoltLogo />
        <View style={styles.brandTitleRow}>
          <Text style={styles.brandVolt}>VOL</Text>
          <Text style={styles.brandTrack}>TRACK</Text>
        </View>
        <Text style={styles.brandSubtitle}>Electrical Project Management</Text>
      </Animated.View>

      {/* Login Form Card */}
      <Animated.View
        entering={FadeInUp.delay(150).duration(600).springify()}
        style={[styles.card, animatedCardStyle]}
      >
        {/* Role Selector Badge Identifier */}
        <View style={styles.roleSelectorContainer}>
          <Pressable
            style={[
              styles.roleTab,
              selectedRole === 'engineer' && styles.roleTabActiveEngineer,
            ]}
            onPress={() => setSelectedRole('engineer')}
          >
            <Ionicons
              name="construct-outline"
              size={16}
              color={selectedRole === 'engineer' ? '#38BDF8' : colors.textMuted}
            />
            <Text
              style={[
                styles.roleTabText,
                selectedRole === 'engineer' && styles.roleTabTextActiveEngineer,
              ]}
            >
              Field Engineer
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.roleTab,
              selectedRole === 'client' && styles.roleTabActiveClient,
            ]}
            onPress={() => setSelectedRole('client')}
          >
            <Ionicons
              name="person-outline"
              size={16}
              color={selectedRole === 'client' ? colors.voltOrange : colors.textMuted}
            />
            <Text
              style={[
                styles.roleTabText,
                selectedRole === 'client' && styles.roleTabTextActiveClient,
              ]}
            >
              Client / Owner
            </Text>
          </Pressable>
        </View>

        {errors.general ? (
          <View style={styles.generalErrorBox}>
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          </View>
        ) : null}

        <CustomInput
          label="Email"
          value={values.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder={selectedRole === 'engineer' ? 'engineer@voltrack.com' : 'client@voltrack.com'}
          iconName="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Password"
          value={values.password}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder="••••••••"
          iconName="lock-closed-outline"
          isPassword
          error={errors.password}
        />

        {/* Options Row */}
        <View style={styles.optionsRow}>
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => handleInputChange('rememberMe', !values.rememberMe)}
            hitSlop={8}
          >
            <View
              style={[
                styles.checkbox,
                values.rememberMe && styles.checkboxChecked,
              ]}
            >
              {values.rememberMe && (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Remember password</Text>
          </Pressable>

          <Pressable onPress={onNavigateToForgotPassword} hitSlop={8}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        </View>

        {/* Action Button */}
        <PrimaryButton
          title={`LOGIN AS ${selectedRole === 'engineer' ? 'ENGINEER' : 'CLIENT'}`}
          onPress={() => handleLogin(selectedRole)}
          isLoading={isLoading}
        />

        {/* Development Quick Login Separator */}
        <View style={styles.devSeparatorContainer}>
          <View style={styles.devSeparatorLine} />
          <Text style={styles.devSeparatorText}>DEV QUICK ACCESS</Text>
          <View style={styles.devSeparatorLine} />
        </View>

        <View style={styles.devButtonsContainer}>
          <Pressable
            style={styles.devQuickButtonEngineer}
            onPress={() => handleLogin('engineer')}
          >
            <Ionicons name="construct" size={18} color="#38BDF8" />
            <Text style={styles.devQuickTextEngineer}>Quick Login: Field Engineer</Text>
          </Pressable>

          <Pressable
            style={styles.devQuickButtonClient}
            onPress={() => handleLogin('client')}
          >
            <Ionicons name="person" size={18} color={colors.voltOrange} />
            <Text style={styles.devQuickTextClient}>Quick Login: Client Owner</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
