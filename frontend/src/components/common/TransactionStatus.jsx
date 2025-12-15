/**
 * Transaction Status Component
 * Displays transaction progress and status
 */

export function TransactionStatus({ status, txId, error }) {
    if (status === 'idle') return null;

    const statusConfig = {
        pending: {
            icon: '⏳',
            color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
            textColor: 'text-yellow-800 dark:text-yellow-200',
            message: 'Waiting for wallet confirmation...'
        },
        confirming: {
            icon: '🔄',
            color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
            textColor: 'text-blue-800 dark:text-blue-200',
            message: 'Transaction confirming on blockchain...'
        },
        success: {
            icon: '✅',
            color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
            textColor: 'text-green-800 dark:text-green-200',
            message: 'Transaction confirmed!'
        },
        error: {
            icon: '❌',
            color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
            textColor: 'text-red-800 dark:text-red-200',
            message: 'Transaction failed'
        }
    };

    const config = statusConfig[status] || statusConfig.idle;

    return (
        <div className={`p-4 rounded-xl border ${config.color}`}>
            <div className="flex items-start gap-3">
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                    <p className={`font-semibold ${config.textColor}`}>
                        {config.message}
                    </p>
                    {txId && (
                        <p className="text-xs mt-1 text-secondary-600 dark:text-secondary-400 font-mono break-all">
                            TX: {txId}
                        </p>
                    )}
                    {error && (
                        <p className="text-sm mt-2 text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}
                    {status === 'confirming' && (
                        <div className="mt-2">
                            <div className="w-full h-1 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 rounded-full animate-pulse w-2/3"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
