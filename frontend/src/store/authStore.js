/**
 * Zustand Store - Authentication State
 * Manages user wallet connection and session
 */

import { create } from 'zustand';
import { AppConfig, UserSession } from '@stacks/connect';

/**
 * @typedef {Object} AuthState
 * @property {UserSession} userSession - The Stacks user session
 * @property {any|null} userData - The connected user's data
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {function(any): void} setUserData - Updates the user data and auth status
 */

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

/**
 * Zustand Store for managing authentication state
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState>>}
 */
export const useAuthStore = create((set) => ({
    userSession,
    userData: null,
    isAuthenticated: false,

    /**
     * Set user data and update authentication status
     * @param {any|null} userData 
     */
    setUserData: (userData) => set({
        userData,
        isAuthenticated: !!userData
    })
}));
