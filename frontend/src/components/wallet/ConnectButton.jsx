/**
 * Wallet Connect Button Component
 * Supports both Stacks Connect and Bitcoin via Reown AppKit
 */

import { useState } from 'react';
import { useStacksAuth } from '../../hooks/useStacksAuth.js';
import { truncateAddress } from '../../utils/helpers.js';
import { AppKitButton, useAppKit, useAppKitAccount } from '@reown/appkit/react';

export function ConnectButton() {
    const { isAuthenticated: isStacksAuth, stxAddress, connectWallet: connectStacks, disconnectWallet: disconnectStacks } = useStacksAuth();
    const { open: openAppKit } = useAppKit();
    const { address: btcAddress, isConnected: isBtcConnected } = useAppKitAccount();

    const [showWalletOptions, setShowWalletOptions] = useState(false);

    // Combined connection state
    const isConnected = isStacksAuth || isBtcConnected;
    const displayAddress = stxAddress || btcAddress;

    const handleDisconnect = () => {
        if (isStacksAuth) {
            disconnectStacks();
        }
        // AppKit handles its own disconnect via the button
    };

    if (isConnected && displayAddress) {
        return (
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-100 dark:bg-secondary-800">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isStacksAuth ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs font-medium text-secondary-500 dark:text-secondary-400">
                        {isStacksAuth ? 'STX' : 'BTC'}
                    </span>
                    <span className="text-sm font-medium">
                        {truncateAddress(displayAddress)}
                    </span>
                </div>
                {isStacksAuth ? (
                    <button
                        onClick={handleDisconnect}
                        className="btn btn-outline text-sm"
                    >
                        Disconnect
                    </button>
                ) : (
                    <AppKitButton />
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowWalletOptions(!showWalletOptions)}
                className="btn btn-primary"
            >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Connect Wallet
            </button>

            {/* Wallet Selection Dropdown */}
            {showWalletOptions && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-secondary-900 rounded-2xl shadow-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden z-50">
                    <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
                        <h3 className="font-bold text-sm text-secondary-900 dark:text-white">Choose Wallet Type</h3>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">Connect with Stacks or Bitcoin</p>
                    </div>

                    {/* Stacks Option */}
                    <button
                        onClick={() => {
                            connectStacks();
                            setShowWalletOptions(false);
                        }}
                        className="w-full p-4 flex items-center gap-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-semibold text-secondary-900 dark:text-white">Stacks Wallet</div>
                            <div className="text-xs text-secondary-500 dark:text-secondary-400">Hiro, Leather, Xverse</div>
                        </div>
                    </button>

                    {/* Bitcoin Option */}
                    <button
                        onClick={() => {
                            openAppKit();
                            setShowWalletOptions(false);
                        }}
                        className="w-full p-4 flex items-center gap-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors text-left border-t border-secondary-200 dark:border-secondary-700"
                    >
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z" />
                                <path fill="#fff" d="M17.3 9.847c.238-1.593-.975-2.45-2.634-3.02l.538-2.157-1.315-.328-.524 2.1c-.345-.086-.7-.167-1.054-.247l.528-2.116-1.313-.327-.539 2.155c-.286-.065-.567-.13-.84-.198l.002-.007-1.813-.453-.35 1.405s.975.223.954.237c.533.133.629.487.613.768l-1.475 5.92c-.046.113-.162.283-.424.218.01.013-.955-.239-.955-.239l-.652 1.505 1.71.426c.318.08.63.163.937.241l-.543 2.18 1.313.327.539-2.16c.358.097.706.187 1.047.271l-.536 2.152 1.313.328.544-2.176c2.244.425 3.93.253 4.64-1.777.571-1.635-.028-2.577-1.212-3.193.862-.199 1.512-.766 1.684-1.938zm-3.015 4.228c-.406 1.63-3.15.748-4.042.527l.721-2.89c.892.222 3.746.663 3.321 2.363zm.406-4.252c-.37 1.484-2.655.73-3.396.545l.654-2.622c.74.185 3.128.53 2.742 2.077z" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-semibold text-secondary-900 dark:text-white">Bitcoin Wallet</div>
                            <div className="text-xs text-secondary-500 dark:text-secondary-400">Via Reown AppKit</div>
                        </div>
                    </button>
                </div>
            )}

            {/* Click outside to close */}
            {showWalletOptions && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowWalletOptions(false)}
                />
            )}
        </div>
    );
}
