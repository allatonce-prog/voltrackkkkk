import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { LoginScreen } from './auth/LoginScreen';
import { ForgotPasswordScreen } from './auth/ForgotPasswordScreen';
import { EngineerDashboardScreen } from './engineer/EngineerDashboardScreen';
import { ClientDashboardScreen } from './client/ClientDashboardScreen';
import { AuthScreenMode, UserRole } from '../types/auth';
import { styles } from '../styles/LoginScreen.styles';

export function AuthContainer() {
  const [mode, setMode] = useState<AuthScreenMode>('login');
  const [userRole, setUserRole] = useState<UserRole>('engineer');

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === 'client') {
      setMode('clientDashboard');
    } else {
      setMode('engineerDashboard');
    }
  };

  if (mode === 'engineerDashboard') {
    return (
      <EngineerDashboardScreen
        onLogout={() => setMode('login')}
        onSwitchRole={(role) => handleLoginSuccess(role)}
      />
    );
  }

  if (mode === 'clientDashboard') {
    return (
      <ClientDashboardScreen
        onLogout={() => setMode('login')}
        onSwitchRole={(role) => handleLoginSuccess(role)}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Ambient background glows */}
      <View style={styles.ambientGlowTopLeft} pointerEvents="none" />
      <View style={styles.ambientGlowBottomRight} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {mode === 'login' ? (
          <LoginScreen
            onNavigateToForgotPassword={() => setMode('forgotPassword')}
            onLoginSuccess={(role) => handleLoginSuccess(role)}
          />
        ) : (
          <ForgotPasswordScreen onBackToLogin={() => setMode('login')} />
        )}

        {/* Footer info */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>© 2026 Voltrack</Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
