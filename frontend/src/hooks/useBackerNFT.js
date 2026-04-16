/**
 * Hook - Backer NFT Lookup
 * Returns the backer NFT (if any) minted for a wallet on a given campaign.
 */

import { useQuery } from '@tanstack/react-query';
import { getBackerNFT } from '../api/nft-rewards.js';
import { nftKeys } from '../lib/queryKeys.js';

export function useBackerNFT(campaignId, address) {
    return useQuery({
        queryKey: nftKeys.backer(campaignId, address),
        queryFn: () => getBackerNFT(campaignId, address),
        enabled: !!campaignId && !!address,
        staleTime: 60000,
        retry: 1,
    });
}
