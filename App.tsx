import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContainer } from './src/screens/AuthContainer';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function MainApp() {
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      let meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
      );

      let styleEl = document.getElementById('voltrack-global-styles') as HTMLStyleElement;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'voltrack-global-styles';
        document.head.appendChild(styleEl);
      }

      styleEl.textContent = `
        * {
          -webkit-tap-highlight-color: transparent !important;
          -webkit-touch-callout: none !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          touch-action: manipulation !important;
        }
        input, textarea, select, button {
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
        }
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: fixed;
          background-color: ${colors.bgMidnight} !important;
          transition: background-color 0.3s ease;
          overscroll-behavior: none !important;
        }
      `;
    }
  }, [colors.bgMidnight]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgMidnight }]}>
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        backgroundColor={colors.bgMidnight}
      />
      <AuthContainer />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
