import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

interface SkeletonBoxProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonBox({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonBoxProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.75, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.box,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.bgInput,
          borderColor: colors.borderDefault,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function SkeletonProjectHero() {
  const { colors } = useTheme();
  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <SkeletonBox width={120} height={20} borderRadius={8} />
        <SkeletonBox width={80} height={20} borderRadius={12} />
      </View>
      <SkeletonBox width="85%" height={24} borderRadius={8} style={{ marginBottom: 12 }} />
      <SkeletonBox width="60%" height={16} borderRadius={6} style={{ marginBottom: 20 }} />

      <View style={[styles.innerBox, { backgroundColor: colors.bgInput, borderColor: colors.borderDefault }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <SkeletonBox width={140} height={16} borderRadius={6} />
          <SkeletonBox width={50} height={22} borderRadius={8} />
        </View>
        <SkeletonBox width="100%" height={8} borderRadius={4} />
      </View>
    </View>
  );
}

export function SkeletonKpiGrid() {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
      {[1, 2, 3, 4].map((idx) => (
        <View
          key={idx}
          style={[styles.kpiBox, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault }]}
        >
          <SkeletonBox width={36} height={36} borderRadius={10} style={{ marginBottom: 10 }} />
          <SkeletonBox width="50%" height={22} borderRadius={6} style={{ marginBottom: 6 }} />
          <SkeletonBox width="80%" height={12} borderRadius={4} />
        </View>
      ))}
    </View>
  );
}

export function SkeletonCard() {
  const { colors } = useTheme();
  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault, marginBottom: 16 }]}>
      <SkeletonBox width="40%" height={18} borderRadius={6} style={{ marginBottom: 12 }} />
      <SkeletonBox width="100%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
      <SkeletonBox width="75%" height={14} borderRadius={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
  },
  cardContainer: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  innerBox: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  kpiBox: {
    flex: 1,
    minWidth: '46%',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
  },
});
