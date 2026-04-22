/**
 * Transaction  Monitoring Utilities
 * Handles transaction status polling and confirmation
 */

import { API_URL } from './stacks-client.js';

/**
 * Wait for a Stacks transaction to be confirmed
 * @param {string} txId - The transaction ID to monitor
 * @param {number} [maxAttempts=60] - Maximum number of polling attempts
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function waitForTransaction(txId, maxAttempts = 60) {
    if (!txId) throw new Error('Transaction ID is required');

    const apiUrl = `${API_URL}/extended/v1/tx/${txId}`;
    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const tx = await response.json();

            if (tx.tx_status === 'success') {
                return { success: true, data: tx };
            }

            if (['abort_by_response', 'abort_by_post_condition', 'failed'].includes(tx.tx_status)) {
                return { success: false, error: tx.tx_result || tx.tx_status };
            }

            // Wait 10 seconds before next check
            await new Promise(resolve => setTimeout(resolve, 10000));
            attempts++;
        } catch (error) {
            console.error(`Error polling transaction ${txId}:`, error);
            await new Promise(resolve => setTimeout(resolve, 10000));
            attempts++;
        }
    }

    return { success: false, error: 'Transaction confirmation timeout' };
}

/**
 * Fetches current details for a given transaction ID
 * @param {string} txId 
 * @returns {Promise<any>}
 */
export async function getTransactionDetails(txId) {
    if (!txId) throw new Error('Transaction ID is required');

    try {
        const response = await fetch(`${API_URL}/extended/v1/tx/${txId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching transaction ${txId}:`, error);
        return null;
    }
}
