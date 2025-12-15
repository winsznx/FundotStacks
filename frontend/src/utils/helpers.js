/**
 * Utility Functions
 * Helper functions for formatting and validation
 */

/**
 * Format STX amount for display
 */
export function formatSTX(amount, decimals = 2) {
    if (amount === null || amount === undefined) return '0 STX';
    return `${parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })} STX`;
}

/**
 * Format block height to estimated time
 */
export function blockHeightToTime(blockHeight, currentBlock) {
    const blocksRemaining = blockHeight - currentBlock;
    if (blocksRemaining <= 0) return 'Ended';

    const minutesRemaining = blocksRemaining * 10; // ~10 minutes per block
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    const daysRemaining = Math.floor(hoursRemaining / 24);

    if (daysRemaining > 0) {
        return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`;
    } else if (hoursRemaining > 0) {
        return `${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''}`;
    } else {
        return `${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}`;
    }
}

/**
 * Truncate address for display
 */
export function truncateAddress(address, start = 6, end = 4) {
    if (!address) return '';
    return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Get campaign status label
 */
export function getStatusLabel(status) {
    const labels = {
        1: 'Active',
        2: 'Funded',
        3: 'Completed',
        4: 'Cancelled'
    };
    return labels[status] || 'Unknown';
}

/**
 * Get status color class
 */
export function getStatusColor(status) {
    const colors = {
        1: 'bg-green-500',
        2: 'bg-blue-500',
        3: 'bg-purple-500',
        4: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
}

/**
 * Calculate funding percentage
 */
export function calculateProgress(raised, goal) {
    if (!goal || goal === 0) return 0;
    return Math.min((raised / goal) * 100, 100);
}

/**
 * Class name merger (for Tailwind)
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
