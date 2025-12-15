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

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_DEPLOYER_ADDRESS;
const CAMPAIGN_CORE = import.meta.env.VITE_CAMPAIGN_CORE_CONTRACT;

/**
 * Create a new campaign
 */
export async function createCampaign(campaignData, userAddress) {
    const { title, description, goalAmount, deadline, milestonesEnabled } = campaignData;

    const functionArgs = [
        stringAsciiCV(title),
        stringUtf8CV(description),
        uintCV(BigInt(Math.floor(goalAmount * 1000000))), // Convert STX to micro-STX
        uintCV(BigInt(deadline)),
        boolCV(milestonesEnabled || false)
    ];

    const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CAMPAIGN_CORE,
        functionName: 'create-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign created:', data.txId);
            return data;
        },
        onCancel: () => {
            console.log('Transaction cancelled by user');
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Fund a campaign
 */
export async function fundCampaign(campaignId, amount, userAddress) {
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
        contractAddress: CONTRACT_ADDRESS,
        contractName: CAMPAIGN_CORE,
        functionName: 'fund-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        onFinish: (data) => {
            console.log('Funding successful:', data.txId);
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Finalize campaign and release funds
 */
export async function finalizeCampaign(campaignId) {
    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CAMPAIGN_CORE,
        functionName: 'finalize-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign finalized:', data.txId);
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
 */
export async function cancelCampaign(campaignId) {
    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CAMPAIGN_CORE,
        functionName: 'cancel-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign cancelled:', data.txId);
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}
