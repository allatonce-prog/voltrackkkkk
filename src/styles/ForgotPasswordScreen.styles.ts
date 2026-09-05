import { StyleSheet } from 'react-native';
import { theme, ThemeColors } from '../theme/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.bgMidnight,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 36,
    },
    header: {
      alignItems: 'center',
      marginBottom: 28,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    titleVolt: {
      fontSize: 28,
      fontWeight: '900',
      color: '#38BDF8',
      letterSpacing: 1.2,
    },
    titleTrack: {
      fontSize: 28,
      fontWeight: '900',
      color: colors.voltOrange,
      letterSpacing: 1.2,
    },
    subtitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      textAlign: 'center',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: colors.bgCard,
      borderRadius: 24,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
    instructionText: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 20,
      paddingVertical: 8,
    },
    backButtonText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
    },
    // Success Confirmation View
    successContainer: {
      alignItems: 'center',
      paddingVertical: 12,
    },
    successIconBadge: {
      width: 64,
      height: 64,
      borderRadius: 22,
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      borderWidth: 1.5,
      borderColor: 'rgba(16, 185, 129, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    successTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.textPrimary,
      marginBottom: 8,
      textAlign: 'center',
    },
    successDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 24,
    },
    emailHighlight: {
      color: '#38BDF8',
      fontWeight: '700',
    },
  });

export const styles = getStyles(theme.colors);
