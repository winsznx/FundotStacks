import { callReadOnlyFunction, cvToJSON, uintCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { MILESTONE_MANAGER } from './contract-config.js';

/**
 * @typedef {Object} Milestone
 * @property {string} description - Milestone description
 * @property {number} percentage - Percentage of total funds
 * @property {boolean} completed - Whether the milestone is completed
 * @property {boolean} verified - Whether the milestone is verified
 * @property {string|null} verifier - Principal of the verifier
 */

/**
 * @typedef {Object} MilestoneConfig
 * @property {number} totalMilestones - Total number of milestones
 * @property {number} completedMilestones - Number of completed milestones
 * @property {boolean} verificationRequired - Whether verification is required
 */

/**
 * Parses raw CV data into a Milestone object
 * @param {any} raw - Raw CV JSON data
 * @returns {Milestone|null}
 */
const parseMilestone = (raw) => {
    if (!raw) return null;

    return {
        description: raw.description?.value || '',
        percentage: Number(raw.percentage?.value ?? 0),
        completed: Boolean(raw.released?.value),
        verified: Boolean(raw.verified?.value),
        verifier: raw.verifier?.value?.value || null
    };
};

/**
 * Fetches milestone configuration for a campaign
 * @param {number|string} campaignId 
 * @returns {Promise<MilestoneConfig|null>}
 */
export async function getCampaignMilestoneConfig(campaignId) {
    if (!campaignId) throw new Error('Campaign ID is required');

    const result = await callReadOnlyFunction({
        contractAddress: MILESTONE_MANAGER.address,
        contractName: MILESTONE_MANAGER.name,
        functionName: 'get-campaign-milestone-config',
        functionArgs: [uintCV(BigInt(campaignId))],
        network: getStacksNetwork(),
        senderAddress: MILESTONE_MANAGER.address
    });

    const json = cvToJSON(result);
    const config = json.value?.value;

    if (!config) return null;

    return {
        totalMilestones: Number(config['total-milestones']?.value ?? 0),
        completedMilestones: Number(config['completed-milestones']?.value ?? 0),
        verificationRequired: Boolean(config['verification-required']?.value)
    };
}

/**
 * Fetches a specific milestone for a campaign
 * @param {number|string} campaignId 
 * @param {number|string} milestoneId 
 * @returns {Promise<Milestone|null>}
 */
export async function getCampaignMilestone(campaignId, milestoneId) {
    const result = await callReadOnlyFunction({
        contractAddress: MILESTONE_MANAGER.address,
        contractName: MILESTONE_MANAGER.name,
        functionName: 'get-milestone',
        functionArgs: [uintCV(BigInt(campaignId)), uintCV(BigInt(milestoneId))],
        network: getStacksNetwork(),
        senderAddress: MILESTONE_MANAGER.address
    });

    const json = cvToJSON(result);
    const milestone = json.value?.value;

    return parseMilestone(milestone);
}

/**
 * Fetches all milestones for a campaign
 * @param {number|string} campaignId 
 * @returns {Promise<Milestone[]>}
 */
export async function getCampaignMilestones(campaignId) {
    try {
        const config = await getCampaignMilestoneConfig(campaignId);

        if (!config || config.totalMilestones === 0) {
            return [];
        }

        const milestoneCalls = [];
        for (let i = 0; i < config.totalMilestones; i += 1) {
            milestoneCalls.push(getCampaignMilestone(campaignId, i));
        }

        const milestones = await Promise.all(milestoneCalls);
        return milestones.filter(Boolean);
    } catch (error) {
        console.error('Error fetching campaign milestones:', error);
        return [];
    }
}
