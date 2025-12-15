/**
 * Stacks Network Configuration
 * Handles network selection and API endpoints
 */

import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const getStacksNetwork = () => {
    const isMainnet = import.meta.env.VITE_STACKS_NETWORK === 'mainnet';

    return isMainnet
        ? new StacksMainnet({ url: 'https://api.mainnet.hiro.so' })
        : new StacksTestnet({ url: 'https://api.testnet.hiro.so' });
};

export const EXPLORER_URL =
    import.meta.env.VITE_STACKS_NETWORK === 'mainnet'
        ? 'https://explorer.hiro.so'
        : 'https://explorer.hiro.so/?chain=testnet';

export const API_URL = getStacksNetwork().coreApiUrl;
