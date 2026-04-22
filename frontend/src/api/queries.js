/**
 * Campaign Contract Read-Only Operations
 * Handles all read-only queries to fetch blockchain state
 */

import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork, API_URL } from './stacks-client.js';
import { CAMPAIGN_CORE } from './contract-config.js';

/**
 * @typedef {Object} Campaign
 * @property {number|string} id - Campaign ID
 * @property {string} creator - Stacks address of the creator
 * @property {string} title - Campaign title
 * @property {string} description - Campaign description
 * @property {number} goalAmount - Goal in STX
 * @property {number} raisedAmount - Amount raised in STX
 * @property {number} deadline - Deadline block height
 * @property {number} status - Campaign status code
 * @property {boolean} milestonesEnabled - Whether milestones are enabled
 * @property {number} createdAt - Creation block height
 */

/**
 * @typedef {Object} Contribution
 * @property {number} amount - Amount contributed in STX
 * @property {number} timestamp - Contribution block height
 */

/**
 * Get campaign details by ID
 * @param {number|string} campaignId 
 * @returns {Promise<Campaign|null>}
 */
export async function getCampaignDetails(campaignId) {
    if (!campaignId) throw new Error('Campaign ID is required');

    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-campaign',
            functionArgs: [uintCV(BigInt(campaignId))],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);

        if (jsonResult.value && jsonResult.value.value) {
            const campaign = jsonResult.value.value;
            return {
                id: campaignId,
                creator: campaign.creator.value,
                title: campaign.title.value,
                description: campaign.description.value,
                goalAmount: parseInt(campaign['goal-amount'].value) / 1000000,
                raisedAmount: parseInt(campaign['raised-amount'].value) / 1000000,
                deadline: parseInt(campaign.deadline.value),
                status: parseInt(campaign.status.value),
                milestonesEnabled: campaign['milestones-enabled'].value,
                createdAt: parseInt(campaign['created-at'].value)
            };
        }

        return null;
    } catch (error) {
        console.error(`Error fetching campaign ${campaignId}:`, error);
        return null;
    }
}

/**
 * Get user's contribution to a campaign
 * @param {number|string} campaignId 
 * @param {string} backerAddress 
 * @returns {Promise<Contribution|null>}
 */
export async function getContribution(campaignId, backerAddress) {
    if (!campaignId || !backerAddress) {
        throw new Error('Campaign ID and Backer Address are required');
    }

    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-contribution',
            functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);

        if (jsonResult.value && jsonResult.value.value) {
            const contribution = jsonResult.value.value;
            return {
                amount: parseInt(contribution.amount.value) / 1000000,
                timestamp: parseInt(contribution.timestamp.value)
            };
        }

        return null;
    } catch (error) {
        console.error(`Error fetching contribution for campaign ${campaignId}:`, error);
        return null;
    }
}

/**
 * Get total number of campaigns
 * @returns {Promise<number>}
 */
export async function getTotalCampaigns() {
    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-campaign-count',
            functionArgs: [],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);
        return parseInt(jsonResult.value.value) || 0;
    } catch (error) {
        console.error('Error fetching total campaigns:', error);
        return 0;
    }
}

/**
 * Get all campaigns (fetches by iterating from 1 to total)
 * @returns {Promise<Campaign[]>}
 */
export async function getAllCampaigns() {
    try {
        const total = await getTotalCampaigns();
        if (total === 0) return [];

        const campaigns = [];
        const promises = [];

        for (let i = 1; i <= total; i++) {
            promises.push(getCampaignDetails(i));
        }

        const results = await Promise.all(promises);
        return results.filter(Boolean);
    } catch (error) {
        console.error('Error fetching all campaigns:', error);
        return [];
    }
}
