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
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 130,
    },
    // Header Bar
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
    roleText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontWeight: '600',
      marginTop: 1,
    },
  });

export const styles = getStyles(theme.colors);
