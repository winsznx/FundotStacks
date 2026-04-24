/**
 * Custom Hook - Campaign Data Fetching
 */

import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getAllCampaigns, getCampaignDetails, getContribution } from '../api/queries.js';
import { useCampaignStore } from '../store/campaignStore.js';
import { campaignKeys } from '../lib/queryKeys.js';

export function useCampaigns() {
    const { setCampaigns } = useCampaignStore();

    return useQuery({
        queryKey: campaignKeys.lists(),
        queryFn: async () => {
            const campaigns = await getAllCampaigns();
            setCampaigns(campaigns);
            return campaigns;
        },
        staleTime: 30000,
        refetchInterval: 60000,
        retry: 2,
    });
}

export function useCampaignDetails(campaignId) {
    return useQuery({
        queryKey: campaignKeys.detail(campaignId),
        queryFn: () => getCampaignDetails(campaignId),
        enabled: !!campaignId,
        staleTime: 15000,
    });
}

export function useContribution(campaignId, backerAddress) {
    return useQuery({
        queryKey: campaignKeys.contribution(campaignId, backerAddress),
        queryFn: () => getContribution(campaignId, backerAddress),
        enabled: !!campaignId && !!backerAddress,
        staleTime: 30000,
    });
}
