/**
 * Campaign Contract Write Operations
 * Handles all transactions that modify blockchain state
 */

import { openContractCall } from '@stacks/connect';
import {
    stringAsciiCV,
    stringUtf8CV,
    uintCV,
    boolCV,
    PostConditionMode,
    makeStandardSTXPostCondition,
    FungibleConditionCode
} from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { CAMPAIGN_CORE } from './contract-config.js';

/**
 * @typedef {Object} CampaignData
 * @property {string} title - Campaign title
 * @property {string} description - Campaign description
 * @property {number} goalAmount - Goal amount in STX
 * @property {number} deadline - Deadline block height
 * @property {boolean} [milestonesEnabled] - Whether milestones are enabled
 */

/**
 * Create a new campaign
 * @param {CampaignData} campaignData - The data for the new campaign
 * @param {string} userAddress - The Stacks address of the creator
 * @returns {Promise<any>}
 */
export async function createCampaign(campaignData, userAddress) {
    const { title, description, goalAmount, deadline, milestonesEnabled } = campaignData;

    if (!title || !description || !goalAmount || !deadline) {
        throw new Error('Missing required campaign data');
    }

    const functionArgs = [
        stringAsciiCV(title),
        stringUtf8CV(description),
        uintCV(BigInt(Math.floor(goalAmount * 1000000))), // Convert STX to micro-STX
        uintCV(BigInt(deadline)),
        boolCV(milestonesEnabled || false)
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'create-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Fund a campaign
 * @param {number|string} campaignId - The ID of the campaign to fund
 * @param {number} amount - The amount in STX to fund
 * @param {string} userAddress - The Stacks address of the backer
 * @returns {Promise<any>}
 */
export async function fundCampaign(campaignId, amount, userAddress) {
    if (!campaignId || !amount || !userAddress) {
        throw new Error('Missing required funding parameters');
    }

    const amountMicroStx = BigInt(Math.floor(amount * 1000000));

    const functionArgs = [
        uintCV(BigInt(campaignId)),
        uintCV(amountMicroStx)
    ];

    // Post-condition: Ensure exact STX transfer
    const postConditions = [
        makeStandardSTXPostCondition(
            userAddress,
            FungibleConditionCode.Equal,
            amountMicroStx
        )
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'fund-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        onFinish: (data) => {
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Complete campaign (mark as completed - funds already with creator)
 * @param {number|string} campaignId - The ID of the campaign to complete
 * @returns {Promise<any>}
 */
export async function completeCampaign(campaignId) {
    if (!campaignId) throw new Error('Campaign ID is required');

    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'complete-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Cancel campaign
 * @param {number|string} campaignId - The ID of the campaign to cancel
 * @returns {Promise<any>}
 */
export async function cancelCampaign(campaignId) {
    if (!campaignId) throw new Error('Campaign ID is required');

    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'cancel-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}
