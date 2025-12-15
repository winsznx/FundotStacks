/**
 * Wallet Connect Button Component
 * Handles wallet connection with Stacks Connect
 */

import { useStacksAuth } from '../../hooks/useStacksAuth.js';
import { truncateAddress } from '../../utils/helpers.js';

export function ConnectButton() {
    const { isAuthenticated, stxAddress, connectWallet, disconnectWallet } = useStacksAuth();

    if (isAuthenticated && stxAddress) {
        return (
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-100 dark:bg-secondary-800">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">
                        {truncateAddress(stxAddress)}
                    </span>
                </div>
                <button
                    onClick={disconnectWallet}
                    className="btn btn-outline text-sm"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={connectWallet}
            className="btn btn-primary"
        >
            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Connect Wallet
        </button>
    );
}
