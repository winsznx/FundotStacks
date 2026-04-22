/**
 * @typedef {Object} ContractIdentifier
 * @property {string} address - The Stacks contract address
 * @property {string} name - The Stacks contract name
 */

/**
 * Parses a Stacks contract identifier (address.name)
 * @param {string} value - The contract identifier string
 * @returns {ContractIdentifier}
 */
const parseIdentifier = (value) => {
    if (!value || typeof value !== 'string' || !value.includes('.')) {
        return { address: '', name: '' };
    }

    const parts = value.split('.');
    if (parts.length !== 2) {
        return { address: '', name: '' };
    }

    return { address: parts[0], name: parts[1] };
};

/** @type {ContractIdentifier} */
export const CAMPAIGN_CORE = parseIdentifier(import.meta.env.VITE_CAMPAIGN_CORE_ADDRESS || '');

/** @type {ContractIdentifier} */
export const MILESTONE_MANAGER = parseIdentifier(import.meta.env.VITE_MILESTONE_MANAGER_ADDRESS || '');

/** @type {ContractIdentifier} */
export const NFT_REWARDS = parseIdentifier(import.meta.env.VITE_NFT_REWARDS_ADDRESS || '');

/** @type {ContractIdentifier} */
export const REFUND_HANDLER = parseIdentifier(import.meta.env.VITE_REFUND_HANDLER_ADDRESS || '');
