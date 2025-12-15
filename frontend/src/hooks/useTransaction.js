/**
 * Custom Hook - Transaction Lifecycle Management
 * Handles transaction state and confirmation waiting
 */

import { useState } from 'react';
import { waitForTransaction } from '../api/transactions.js';

export function useTransaction() {
    const [status, setStatus] = useState('idle'); // idle, pending, confirming, success, error
    const [txId, setTxId] = useState(null);
    const [error, setError] = useState(null);

    const submitTransaction = async (txFunction, ...args) => {
        try {
            setStatus('pending');
            setError(null);

            const result = await txFunction(...args);
            const transactionId = result.txId;
            setTxId(transactionId);
            setStatus('confirming');

            // Wait for confirmation
            const confirmation = await waitForTransaction(transactionId);

            if (confirmation.success) {
                setStatus('success');
                return confirmation.data;
            } else {
                throw new Error(confirmation.error);
            }
        } catch (err) {
            setStatus('error');
            setError(err.message);
            throw err;
        }
    };

    const resetTransaction = () => {
        setStatus('idle');
        setTxId(null);
        setError(null);
    };

    return {
        status,
        txId,
        error,
        submitTransaction,
        resetTransaction,
        isLoading: status === 'pending' || status === 'confirming'
    };
}
