/**
 * Stacks Network Configuration
 * Handles network selection and API endpoints
 */

import { StacksMainnet, StacksTestnet } from '@stacks/network';

/**
 * Returns the configured Stacks network instance
 * @returns {StacksMainnet|StacksTestnet}
 */
export const getStacksNetwork = () => {
    const network = import.meta.env.VITE_STACKS_NETWORK;
    const customUrl = import.meta.env.VITE_STACKS_API_URL;

    if (network === 'mainnet') {
        return new StacksMainnet({ url: customUrl || 'https://api.mainnet.hiro.so' });
    }

    return new StacksTestnet({ url: customUrl || 'https://api.testnet.hiro.so' });
};

/**
 * The base URL for the Stacks Explorer based on current network
 * @type {string}
 */
export const EXPLORER_URL =
    import.meta.env.VITE_STACKS_NETWORK === 'mainnet'
        ? 'https://explorer.hiro.so'
        : 'https://explorer.hiro.so/?chain=testnet';

/**
 * The base URL for the Stacks Blockchain API
 * @type {string}
 */
export const API_URL = getStacksNetwork().coreApiUrl;
