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
    bgMidnight: '#050914',
    bgCard: '#0E172A',
    bgCardGlass: 'rgba(15, 23, 42, 0.85)',
    bgInput: '#131F37',
    borderDefault: '#223254',
    borderGlass: 'rgba(255, 255, 255, 0.08)',
    borderFocus: '#FF5500',
    borderError: '#EF4444',

    voltOrange: '#FF5500',
    voltOrangeHover: '#FF6F1F',
    voltOrangeGlow: 'rgba(255, 85, 0, 0.35)',
    electricBlue: '#2563EB',
    electricBlueGlow: 'rgba(37, 99, 235, 0.35)',
    voltCyan: '#00E5FF',

    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textDark: '#0F172A',

    error: '#F87171',
    success: '#10B981',
  } as ThemeColors,
  spring: {
    damping: 15,
    stiffness: 180,
    mass: 0.5,
  },
};

export const lightTheme = {
  colors: {
    bgMidnight: '#F1F5F9',
    bgCard: '#FFFFFF',
    bgCardGlass: 'rgba(255, 255, 255, 0.95)',
    bgInput: '#F8FAFC',
    borderDefault: '#CBD5E1',
    borderGlass: 'rgba(0, 0, 0, 0.08)',
    borderFocus: '#FF5500',
    borderError: '#EF4444',

    voltOrange: '#FF5500',
    voltOrangeHover: '#E04B00',
    voltOrangeGlow: 'rgba(255, 85, 0, 0.2)',
    electricBlue: '#0284C7',
    electricBlueGlow: 'rgba(2, 132, 199, 0.2)',
    voltCyan: '#0284C7',

    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    textDark: '#FFFFFF',

    error: '#DC2626',
    success: '#059669',
  } as ThemeColors,
  spring: {
    damping: 15,
    stiffness: 180,
    mass: 0.5,
  },
};

// Mutable active theme export for seamless reactive updates across the app
export const theme = {
  colors: { ...darkTheme.colors },
  spring: darkTheme.spring,
};
