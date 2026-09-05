import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Safe cross-platform Haptic Feedback utility for VoltTrack.
 * Triggers native iOS/Android tactile engine responses and gracefully no-ops on Web.
 */

export const triggerHaptic = {
  /**
   * Subtle tap for light selections like tab switching, dropdown items, filter pills.
   */
  light: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }
  },

  /**
   * Medium impact for primary actions like submitting forms, opening modals, toggling switches.
   */
  medium: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    }
  },

  /**
   * Heavy impact for destructive or high-consequence actions like logout or clearing cache.
   */
  heavy: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } catch {}
    }
  },

  /**
   * Precise click feedback for segmented tab switches, slider adjustments, star ratings.
   */
  selection: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
  },

  /**
   * Success vibration pattern for sync completions, form submissions, login success.
   */
  success: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}
    }
  },

  /**
   * Warning vibration pattern for validation alerts or offline mode toggles.
   */
  warning: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch {}
    }
  },

  /**
   * Error vibration pattern for failed inputs or authentication errors.
   */
  error: () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch {}
    }
  },
};
