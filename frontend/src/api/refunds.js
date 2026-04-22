import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { REFUND_HANDLER } from './contract-config.js';

/**
 * Checks if a refund has already been processed for a backer in a specific campaign
 * @param {number|string} campaignId 
 * @param {string} backerAddress 
 * @returns {Promise<boolean>}
 */
export async function isRefundProcessed(campaignId, backerAddress) {
    if (!campaignId || !backerAddress) {
        throw new Error('Campaign ID and Backer Address are required');
    }

    try {
        const result = await callReadOnlyFunction({
            contractAddress: REFUND_HANDLER.address,
            contractName: REFUND_HANDLER.name,
            functionName: 'is-refund-processed',
            functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
            network: getStacksNetwork(),
            senderAddress: REFUND_HANDLER.address
        });

        const json = cvToJSON(result);
        return Boolean(json.value);
    } catch (error) {
        console.error('Error checking refund status:', error);
        return false;
    }
}
