/**
 * Custom Hook - NFT Reward Tracking
 */

import { useQuery } from '@tanstack/react-query';
import { getBackerNFT, getTokenURI } from '../api/nft-rewards.js';
import { nftKeys } from '../lib/queryKeys.js';

export function useBackerNFT(campaignId, backerAddress) {
  const { data: tokenId, isLoading: isIdLoading } = useQuery({
    queryKey: nftKeys.backer(campaignId, backerAddress),
    queryFn: () => getBackerNFT(campaignId, backerAddress),
    enabled: !!campaignId && !!backerAddress,
    staleTime: 60000,
  });

  const { data: uri, isLoading: isUriLoading } = useQuery({
    queryKey: nftKeys.uri(tokenId),
    queryFn: () => getTokenURI(tokenId),
    enabled: !!tokenId,
    staleTime: 300000,
  });

  return {
    tokenId,
    uri,
    isLoading: isIdLoading || isUriLoading,
    hasNFT: !!tokenId,
  };
}
