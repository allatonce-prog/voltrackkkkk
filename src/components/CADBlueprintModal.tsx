import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { theme } from '../theme/theme';

interface CADComponentPin {
  id: string;
  name: string;
  layer: string;
  status: 'installed' | 'in_progress' | 'pending';
  installedQty: string;
  plannedQty: string;
  xPercent: number; // Position percentage on floorplan
  yPercent: number;
}

interface CADBlueprintModalProps {
  visible: boolean;
  onClose: () => void;
  activeLayerFilter?: string;
}

export function CADBlueprintModal({
  visible,
  onClose,
  activeLayerFilter = 'all',
}: CADBlueprintModalProps) {
  const [selectedLayer, setSelectedLayer] = useState<string>(activeLayerFilter);
  const [selectedPin, setSelectedPin] = useState<CADComponentPin | null>(null);

  const pins: CADComponentPin[] = [
    {
      id: 'pin-1',
      name: 'Main Distribution Panelboard (MDP-1)',
      layer: 'E-PANEL',
      status: 'in_progress',
      installedQty: '8 Panels',
      plannedQty: '10 Panels',
      xPercent: 25,
      yPercent: 35,
    },
    {
      id: 'pin-2',
      name: 'Primary Conduit Pathway Run #1',
      layer: 'E-CONDUIT',
      status: 'installed',
      installedQty: '150 Meters',
      plannedQty: '150 Meters',
      xPercent: 55,
      yPercent: 25,
    },
    {
      id: 'pin-3',
      name: '3-Phase Feeder Wire Pulling #2',
      layer: 'E-WIRING',
      status: 'in_progress',
      installedQty: '280 Meters',
      plannedQty: '350 Meters',
      xPercent: 68,
      yPercent: 55,
    },
    {
      id: 'pin-4',
      name: '2nd Floor LED Fixture Array',
      layer: 'E-LIGHT',
      status: 'in_progress',
      installedQty: '45 Units',
      plannedQty: '90 Units',
      xPercent: 40,
      yPercent: 70,
    },
    {
      id: 'pin-5',
      name: 'Grid Circuit Test Node #5',
      layer: 'E-COMMISSIONING',
      status: 'pending',
      installedQty: '0 Circuits',
      plannedQty: '5 Circuits',
      xPercent: 80,
      yPercent: 40,
    },
  ];

  const filteredPins = pins.filter(
    (pin) => selectedLayer === 'all' || pin.layer === selectedLayer
  );

  const getPinColor = (status: CADComponentPin['status']) => {
    if (status === 'installed') return theme.colors.success;
    if (status === 'in_progress') return theme.colors.voltOrange;
    return '#64748B';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              entering={FadeInUp.duration(300)}
              exiting={FadeOutDown.duration(200)}
              style={styles.modalCard}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleGroup}>
                  <View style={styles.iconBadge}>
                    <Ionicons name="map-outline" size={20} color="#38BDF8" />
                  </View>
                  <View>
                    <Text style={styles.title}>CAD Drawing Blueprint Overlay</Text>
                    <Text style={styles.subtitle}>Tagum Commercial Center • DXF Layer Map</Text>
                  </View>
                </View>

                <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={8}>
                  <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
                </Pressable>
              </View>

              {/* CAD Layer Filters */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.layerBar}
                contentContainerStyle={{ gap: 8 }}
              >
                {[
                  { id: 'all', label: 'All Layers' },
                  { id: 'E-CONDUIT', label: 'E-CONDUIT' },
                  { id: 'E-WIRING', label: 'E-WIRING' },
                  { id: 'E-PANEL', label: 'E-PANEL' },
                  { id: 'E-LIGHT', label: 'E-LIGHT' },
                ].map((layer) => {
                  const isActive = selectedLayer === layer.id;
                  return (
                    <Pressable
                      key={layer.id}
                      style={[styles.layerChip, isActive && styles.layerChipActive]}
                      onPress={() => setSelectedLayer(layer.id)}
                    >
                      <Text
                        style={[styles.layerChipText, isActive && styles.layerChipTextActive]}
                      >
                        {layer.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Blueprint Viewport Map Box */}
              <View style={styles.viewportBox}>
                <View style={styles.blueprintGridBackground}>
                  {/* Grid Lines */}
                  <View style={styles.gridLineHorizontal1} />
                  <View style={styles.gridLineHorizontal2} />
                  <View style={styles.gridLineVertical1} />
                  <View style={styles.gridLineVertical2} />

                  {/* CAD Blueprint Schematic Outlines */}
                  <View style={styles.cadWallOutline1} />
                  <View style={styles.cadWallOutline2} />

                  <Text style={styles.blueprintWatermark}>
                    TAGUM COMMERCIAL CENTER • GROUND FLOOR .DXF VECTOR MAP
                  </Text>

                  {/* Component Status Pins */}
                  {filteredPins.map((pin) => (
                    <Pressable
                      key={pin.id}
                      style={[
                        styles.pinMarker,
                        {
                          left: `${pin.xPercent}%`,
                          top: `${pin.yPercent}%`,
                          borderColor: getPinColor(pin.status),
                        },
                      ]}
                      onPress={() => setSelectedPin(pin)}
                    >
                      <View
                        style={[
                          styles.pinInnerDot,
                          { backgroundColor: getPinColor(pin.status) },
                        ]}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Legend & Selected Component Info */}
              {selectedPin ? (
                <View style={styles.pinDetailCard}>
                  <View style={styles.pinDetailHeader}>
                    <View style={styles.pinDetailLeft}>
                      <View
                        style={[
                          styles.pinStatusDot,
                          { backgroundColor: getPinColor(selectedPin.status) },
                        ]}
                      />
                      <Text style={styles.pinDetailName}>{selectedPin.name}</Text>
                    </View>
                    <Pressable onPress={() => setSelectedPin(null)}>
                      <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
                    </Pressable>
                  </View>

                  <View style={styles.pinMetaRow}>
                    <Text style={styles.pinMetaText}>
                      Layer: <Text style={styles.pinMetaHighlight}>{selectedPin.layer}</Text>
                    </Text>
                    <Text style={styles.pinMetaText}>
                      Progress: <Text style={styles.pinMetaHighlight}>{selectedPin.installedQty} / {selectedPin.plannedQty}</Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.legendRow}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.success }]} />
                    <Text style={styles.legendText}>Verified</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.voltOrange }]} />
                    <Text style={styles.legendText}>In Progress</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#64748B' }]} />
                    <Text style={styles.legendText}>Pending</Text>
                  </View>
                  <Text style={styles.legendHint}>Tap any pin to inspect CAD entity</Text>
                </View>
              )}

              <Pressable style={styles.doneBtn} onPress={onClose}>
                <Text style={styles.doneBtnText}>Close Blueprint Viewer</Text>
              </Pressable>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: theme.colors.bgCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.borderDefault,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.bgInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerBar: {
    maxHeight: 36,
    marginBottom: 14,
  },
  layerChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: theme.colors.bgInput,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  layerChipActive: {
    backgroundColor: theme.colors.electricBlue,
    borderColor: theme.colors.electricBlue,
  },
  layerChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  layerChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Viewport Grid Box
  viewportBox: {
    height: 220,
    backgroundColor: '#060B18',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  blueprintGridBackground: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  gridLineHorizontal1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  gridLineHorizontal2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  gridLineVertical1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  gridLineVertical2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  cadWallOutline1: {
    position: 'absolute',
    left: 20,
    top: 30,
    width: 220,
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  cadWallOutline2: {
    position: 'absolute',
    right: 20,
    top: 40,
    width: 180,
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 0, 0.3)',
  },
  blueprintWatermark: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(56, 189, 248, 0.3)',
    letterSpacing: 0.5,
  },
  pinMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  pinInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Legend & Selection
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.bgInput,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  legendHint: {
    flex: 1,
    textAlign: 'right',
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  pinDetailCard: {
    backgroundColor: theme.colors.bgInput,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#38BDF8',
    marginBottom: 14,
  },
  pinDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pinDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pinStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pinDetailName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  pinMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinMetaText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  pinMetaHighlight: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  doneBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bgInput,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
    height: 44,
    borderRadius: 14,
  },
  doneBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
