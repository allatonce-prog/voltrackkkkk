import { ElectricalMilestone } from '../types/project';

/**
 * Calculates the exact overall physical progress percentage based on the Capstone Task-Weightage Mathematical Model:
 * Physical Progress (%) = SUM [ (Installed Quantity_i / Total Planned Quantity_i) * Weight Factor_i ] * 100
 */
export const calculateProjectProgress = (milestones: ElectricalMilestone[]): number => {
  if (!milestones || milestones.length === 0) return 0;

  const totalWeightedProgress = milestones.reduce((sum, milestone) => {
    if (milestone.totalPlannedQuantity <= 0) return sum;
    const completionRatio = Math.min(
      1,
      milestone.installedQuantity / milestone.totalPlannedQuantity
    );
    return sum + completionRatio * milestone.weightFactor;
  }, 0);

  return Number((totalWeightedProgress * 100).toFixed(1));
};

export const calculateMilestonePercentage = (milestone: ElectricalMilestone): number => {
  if (milestone.totalPlannedQuantity <= 0) return 0;
  const ratio = Math.min(1, milestone.installedQuantity / milestone.totalPlannedQuantity);
  return Math.round(ratio * 100);
};
