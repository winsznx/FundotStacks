/**
 * Custom Hook - Milestone Management
 */

import { useQuery } from '@tanstack/react-query';
import { getCampaignMilestones, getCampaignMilestoneConfig } from '../api/milestones.js';
import { milestoneKeys } from '../lib/queryKeys.js';

export function useCampaignMilestones(campaignId) {
  const { data: config, isLoading: isConfigLoading } = useQuery({
    queryKey: milestoneKeys.config(campaignId),
    queryFn: () => getCampaignMilestoneConfig(campaignId),
    enabled: !!campaignId,
  });

  const { data: milestones, isLoading: isListLoading } = useQuery({
    queryKey: milestoneKeys.list(campaignId),
    queryFn: () => getCampaignMilestones(campaignId),
    enabled: !!campaignId,
  });

  return {
    config,
    milestones,
    isLoading: isConfigLoading || isListLoading,
    totalCount: config?.totalMilestones || 0,
    completedCount: config?.completedMilestones || 0,
  };
}
