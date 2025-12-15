/**
 * Wallet Display Component
 * Shows wallet address and balance
 */

import { useStacksAuth } from '../../hooks/useStacksAuth.js';
import { truncateAddress } from '../../utils/helpers.js';

export function WalletDisplay() {
    const { isAuthenticated, stxAddress } = useStacksAuth();

    if (!isAuthenticated || !stxAddress) {
        return null;
    }

    return (
        <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">Your Wallet</h3>
            <div className="space-y-3">
                <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                        Address
                    </div>
                    <div className="font-mono text-sm bg-secondary-100 dark:bg-secondary-800 p-3 rounded-lg break-all">
                        {stxAddress}
                    </div>
                </div>
                <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                        Network
                    </div>
                    <div className="text-sm font-semibold">
                        {import.meta.env.VITE_STACKS_NETWORK === 'mainnet' ? 'Mainnet' : 'Testnet'}
                    </div>
                </div>
            </div>
        </div>
    );
}
