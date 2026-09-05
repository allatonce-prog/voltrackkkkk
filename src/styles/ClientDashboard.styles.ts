import { StyleSheet, Platform } from 'react-native';
import { theme, ThemeColors } from '../theme/theme';

export const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.bgMidnight,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 130, // Extra space so bottom tab bar never overlaps
    },
    // App Bar
    appBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoBox: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: colors.bgCard,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandVolt: {
      fontSize: 20,
      fontWeight: '900',
      color: '#38BDF8',
      letterSpacing: 1,
    },
    brandTrack: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.voltOrange,
      letterSpacing: 1,
    },
    roleBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(255, 85, 0, 0.12)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'rgba(255, 85, 0, 0.25)',
      marginTop: 2,
    },
    roleText: {
      fontSize: 10,
      color: colors.voltOrange,
      fontWeight: '700',
    },

    // Client Cards
    card: {
      backgroundColor: colors.bgCard,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      ...(Platform.OS === 'web'
        ? ({ boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)' } as any)
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 6,
          }),
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    cardSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },

    // Progress Gauge Ring Box
    gaugeContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    gaugeRingOuter: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 8,
      borderColor: 'rgba(56, 189, 248, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    gaugeRingActive: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 8,
      borderColor: colors.voltOrange,
      borderTopColor: '#38BDF8',
      borderRightColor: '#38BDF8',
    },
    gaugeValue: {
      fontSize: 32,
      fontWeight: '900',
      color: colors.textPrimary,
    },
    gaugeLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // Phase Progress Bar
    phaseItem: {
      marginBottom: 12,
    },
    phaseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    phaseTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    phasePercent: {
      fontSize: 12,
      fontWeight: '700',
      color: '#38BDF8',
    },
    progressBarBg: {
      height: 8,
      backgroundColor: colors.bgInput,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: colors.voltOrange,
      borderRadius: 4,
    },

    // Floating Bottom Tab Dock
    tabBarContainer: {
      position: 'absolute',
      bottom: 24,
      left: 20,
      right: 20,
      height: 64,
      backgroundColor: colors.bgCard,
      borderRadius: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      ...(Platform.OS === 'web'
        ? ({ boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.2)' } as any)
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 12,
          }),
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    tabIconBox: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabIconBoxActive: {
      backgroundColor: 'rgba(255, 85, 0, 0.2)',
      borderWidth: 1,
      borderColor: colors.voltOrange,
    },
    tabLabel: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.textMuted,
      marginTop: 2,
    },
    tabLabelActive: {
      color: colors.voltOrange,
      fontWeight: '700',
    },
  });

export const styles = getStyles(theme.colors);
