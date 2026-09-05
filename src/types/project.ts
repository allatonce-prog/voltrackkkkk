import { Ionicons } from '@expo/vector-icons';

export interface ElectricalMilestone {
  id: string;
  name: string;
  category: 'conduit' | 'wiring' | 'panelboard' | 'fixtures' | 'commissioning';
  weightFactor: number; // e.g. 0.25 for 25%
  installedQuantity: number;
  totalPlannedQuantity: number;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  inspectionStatus: 'verified' | 'pending_inspection' | 'in_progress';
  inspectorName?: string;
  lastVerifiedTimestamp?: string;
  locationCoordinates?: string;
  proofPhotoTitle?: string;
}

export interface SiteInspectionPhoto {
  id: string;
  milestoneId: string;
  title: string;
  photoUrl: string;
  timestamp: string;
  location: string;
  engineerName: string;
}

export interface ContractedProject {
  id: string;
  title: string;
  clientName: string;
  location: string; // e.g., Tagum City, Davao del Norte
  contractor: string;
  startDate: string;
  targetCompletionDate: string;
  status: 'in_progress' | 'completed' | 'inspection_pending';
  milestones: ElectricalMilestone[];
}

export interface OfflineSyncStatus {
  isOnline: boolean;
  pendingSyncCount: number;
  lastSyncedTimestamp: string;
}

export type EngineerTab = 'projects' | 'progress' | 'camera' | 'sync' | 'profile';
