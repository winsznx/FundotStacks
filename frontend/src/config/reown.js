/**
 * Reown AppKit Configuration
 * Setup for Bitcoin wallet connection using Reown AppKit
 */

import { createAppKit } from '@reown/appkit/react';
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin';
import { bitcoin, bitcoinTestnet } from '@reown/appkit/networks';

// Get projectId from environment (supports both Vite and Next.js/Vercel)
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || import.meta.env.NEXT_PUBLIC_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID';

// Set the networks
const networks = [bitcoin, bitcoinTestnet];

// Set up Bitcoin Adapter
const bitcoinAdapter = new BitcoinAdapter({ projectId });

// Create a metadata object
const metadata = {
    name: 'FundotStacks',
    description: 'Decentralized Crowdfunding on Bitcoin & Stacks',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://fundotstacks.com',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Create modal
createAppKit({
    adapters: [bitcoinAdapter],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true,
        email: false,
        socials: []
    },
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#f97316', // Orange to match FundotStacks theme
        '--w3m-border-radius-master': '12px'
    }
});

export { bitcoinAdapter };
