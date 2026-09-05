export interface ThemeColors {
  bgMidnight: string;
  bgCard: string;
  bgCardGlass: string;
  bgInput: string;
  borderDefault: string;
  borderGlass: string;
  borderFocus: string;
  borderError: string;
  voltOrange: string;
  voltOrangeHover: string;
  voltOrangeGlow: string;
  electricBlue: string;
  electricBlueGlow: string;
  voltCyan: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDark: string;
  error: string;
  success: string;
}

export const darkTheme = {
  colors: {
    // iOS 18 System Dark Palette (OLED Black & Grouped Elevated Surfaces)
    bgMidnight: '#000000',
    bgCard: '#1C1C1E',
    bgCardGlass: 'rgba(28, 28, 30, 0.82)',
    bgInput: '#2C2C2E',
    borderDefault: 'rgba(255, 255, 255, 0.12)',
    borderGlass: 'rgba(255, 255, 255, 0.08)',
    borderFocus: '#FF6B00',
    borderError: '#FF453A',

    voltOrange: '#FF6B00',
    voltOrangeHover: '#FF8533',
    voltOrangeGlow: 'rgba(255, 107, 0, 0.35)',
    electricBlue: '#0A84FF',
    electricBlueGlow: 'rgba(10, 132, 255, 0.35)',
    voltCyan: '#64D2FF',

    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(235, 235, 245, 0.6)',
    textMuted: 'rgba(235, 235, 245, 0.38)',
    textDark: '#000000',

    error: '#FF453A',
    success: '#30D158',
  } as ThemeColors,
  spring: {
    damping: 22,
    stiffness: 210,
    mass: 0.7,
  },
};

export const lightTheme = {
  colors: {
    // iOS 18 System Light Palette (San Francisco Crisp Gray & Pure White Cards)
    bgMidnight: '#F2F2F7',
    bgCard: '#FFFFFF',
    bgCardGlass: 'rgba(255, 255, 255, 0.85)',
    bgInput: '#E5E5EA',
    borderDefault: 'rgba(60, 60, 67, 0.14)',
    borderGlass: 'rgba(60, 60, 67, 0.08)',
    borderFocus: '#FF6B00',
    borderError: '#FF3B30',

    voltOrange: '#FF6B00',
    voltOrangeHover: '#E05D00',
    voltOrangeGlow: 'rgba(255, 107, 0, 0.25)',
    electricBlue: '#007AFF',
    electricBlueGlow: 'rgba(0, 122, 255, 0.25)',
    voltCyan: '#32ADE6',

    textPrimary: '#000000',
    textSecondary: 'rgba(60, 60, 67, 0.6)',
    textMuted: 'rgba(60, 60, 67, 0.4)',
    textDark: '#FFFFFF',

    error: '#FF3B30',
    success: '#34C759',
  } as ThemeColors,
  spring: {
    damping: 22,
    stiffness: 210,
    mass: 0.7,
  },
};

// Mutable active theme export for seamless reactive updates across the app
export const theme = {
  colors: { ...darkTheme.colors },
  spring: darkTheme.spring,
};
