/**
 * Transaction  Monitoring Utilities
 * Handles transaction status polling and confirmation
 */

import { API_URL } from './stacks-client.js';

/**
 * Wait for transaction to be confirmed
 */
export async function waitForTransaction(txId, maxAttempts = 60) {
    const apiUrl = `${API_URL}/extended/v1/tx/${txId}`;

    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            const response = await fetch(apiUrl);
            const tx = await response.json();

            if (tx.tx_status === 'success') {
                return { success: true, data: tx };
            }

            if (tx.tx_status === 'abort_by_response' || tx.tx_status === 'abort_by_post_condition') {
                return { success: false, error: tx.tx_result };
            }

            // Wait 10 seconds before next check
            await new Promise(resolve => setTimeout(resolve, 10000));
            attempts++;
        } catch (error) {
            console.error('Error checking transaction status:', error);
            await new Promise(resolve => setTimeout(resolve, 10000));
            attempts++;
        }
    }

    throw new Error('Transaction confirmation timeout');
}

/**
 * Get transaction details
 */
export async function getTransactionDetails(txId) {
    try {
        const response = await fetch(`${API_URL}/extended/v1/tx/${txId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error;
    }
}
