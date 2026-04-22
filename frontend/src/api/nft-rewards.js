import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { NFT_REWARDS } from './contract-config.js';

/**
 * Fetches the NFT token ID for a backer of a specific campaign
 * @param {number|string} campaignId 
 * @param {string} backerAddress 
 * @returns {Promise<number|null>}
 */
export async function getBackerNFT(campaignId, backerAddress) {
    if (!campaignId || !backerAddress) {
        throw new Error('Campaign ID and Backer Address are required');
    }

    try {
        const result = await callReadOnlyFunction({
            contractAddress: NFT_REWARDS.address,
            contractName: NFT_REWARDS.name,
            functionName: 'get-backer-nft',
            functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
            network: getStacksNetwork(),
            senderAddress: NFT_REWARDS.address
        });

        const json = cvToJSON(result);
        const payload = json.value?.value;
        if (!payload || !payload.token_id) return null;
        return Number(payload.token_id.value);
    } catch (error) {
        console.error('Error fetching backer NFT:', error);
        return null;
    }
}

/**
 * Fetches the metadata URI for a specific NFT token
 * @param {number|string} tokenId 
 * @returns {Promise<string|null>}
 */
export async function getTokenURI(tokenId) {
    if (tokenId === undefined || tokenId === null) {
        throw new Error('Token ID is required');
    }

    try {
        const result = await callReadOnlyFunction({
            contractAddress: NFT_REWARDS.address,
            contractName: NFT_REWARDS.name,
            functionName: 'get-token-uri',
            functionArgs: [uintCV(BigInt(tokenId))],
            network: getStacksNetwork(),
            senderAddress: NFT_REWARDS.address
        });

        const json = cvToJSON(result);
        if (!json.value || !json.value.value) return null;
        return json.value.value.value;
    } catch (error) {
        console.error('Error fetching token URI:', error);
        return null;
    }
}
