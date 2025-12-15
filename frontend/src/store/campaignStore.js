/**
 * Zustand Store - Campaign State
 * Manages campaign data and filters
 */

import { create } from 'zustand';

export const useCampaignStore = create((set, get) => ({
    campaigns: [],
    selectedCampaign: null,
    filters: {
        status: 'all',
        sortBy: 'recent'
    },

    setCampaigns: (campaigns) => set({ campaigns }),

    selectCampaign: (campaignId) => {
        const campaign = get().campaigns.find(c => c.id === campaignId);
        set({ selectedCampaign: campaign });
    },

    updateCampaignLocally: (campaignId, updates) => set((state) => ({
        campaigns: state.campaigns.map(c =>
            c.id === campaignId ? { ...c, ...updates } : c
        )
    })),

    setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

    getFilteredCampaigns: () => {
        const { campaigns, filters } = get();
        let filtered = [...campaigns];

        // Filter by status
        if (filters.status !== 'all') {
            const statusMap = { active: 1, funded: 2, completed: 3, cancelled: 4 };
            filtered = filtered.filter(c => c.status === statusMap[filters.status]);
        }

        // Sort
        switch (filters.sortBy) {
            case 'recent':
                filtered.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'ending-soon':
                filtered.sort((a, b) => a.deadline - b.deadline);
                break;
            case 'most-funded':
                filtered.sort((a, b) => b.raisedAmount - a.raisedAmount);
                break;
            default:
                break;
        }

        return filtered;
    }
}));
