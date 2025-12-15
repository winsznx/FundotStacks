/**
 * Wallet authentication and user session management
 */
import { useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { useAuthStore } from '../store/authStore';

export function useStacksAuth() {
    const { userSession, setUserData } = useAuthStore();

    useEffect(() => {
        // Check for existing session on mount
        if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            setUserData(userData);
        }
    }, []);

    const connectWallet = () => {
        showConnect({
            appDetails: {
                name: 'FundotStacks',
                icon: window.location.origin + '/logo.svg'
            },
            onFinish: () => {
                const userData = userSession.loadUserData();
                setUserData(userData);
            },
            userSession
        });
    };

    const disconnectWallet = () => {
        userSession.signUserOut();
        setUserData(null);
    };

    return {
        isAuthenticated: userSession.isUserSignedIn(),
        userData: userSession.isUserSignedIn() ? userSession.loadUserData() : null,
        stxAddress: userSession.isUserSignedIn() ? userSession.loadUserData()?.profile?.stxAddress?.testnet : null,
        connectWallet,
        disconnectWallet
    };
}
