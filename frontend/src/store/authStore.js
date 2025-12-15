/**
 * Zustand Store - Authentication State
 * Manages user wallet connection and session
 */

import { create } from 'zustand';
import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const useAuthStore = create((set) => ({
    userSession,
    userData: null,
    isAuthenticated: false,

    setUserData: (userData) => set({
        userData,
        isAuthenticated: !!userData
    })
}));
