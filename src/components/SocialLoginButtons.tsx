import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export function SocialLoginButtons() {
  return (
    <View style={styles.container}>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonsRow}>
        <Pressable style={styles.socialButton} onPress={() => {}}>
          <Ionicons name="logo-google" size={20} color={theme.colors.textPrimary} />
          <Text style={styles.socialButtonText}>Google</Text>
        </Pressable>

        <Pressable style={styles.socialButton} onPress={() => {}}>
          <Ionicons name="logo-apple" size={22} color={theme.colors.textPrimary} />
          <Text style={styles.socialButtonText}>Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderDefault,
  },
  dividerText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.bgInput,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    borderRadius: 14,
    height: 48,
  },
  socialButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
