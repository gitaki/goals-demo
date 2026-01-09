import React from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

export default function GoalCard({ goal, status, onStatusChange }) {
    // status: 'completed' | 'failed' | 'open'

    const getStatusColor = () => {
        switch (status) {
            case 'completed': return 'bg-system-green border-system-green text-black';
            case 'failed': return 'bg-system-red border-system-red text-white';
            default: return 'bg-transparent border-system-gray2 text-transparent'; // Open
        }
    };

    return (
        <div className="group relative overflow-hidden bg-system-bg-secondary rounded-xl p-4 flex items-center gap-4 active:scale-[0.99] transition-all duration-200 border border-white/5">
            {/* Status Toggle (Left) */}
            <button
                onClick={() => onStatusChange(status === 'completed' ? 'open' : 'completed')}
                className={clsx(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                    getStatusColor()
                )}
            >
                {status === 'completed' && <Check size={14} strokeWidth={4} />}
                {status === 'failed' && <X size={14} strokeWidth={4} />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className={clsx(
                    "text-base font-medium truncate transition-all",
                    status === 'completed' ? "text-system-gray line-through" : "text-white"
                )}>
                    {goal.title}
                </h3>
                <p className="text-xs text-system-gray mt-0.5 flex gap-2">
                    <span className={clsx(
                        "uppercase tracking-wider font-bold",
                        goal.type === 'daily' ? "text-system-blue" : "text-system-purple"
                    )}>
                        {goal.type}
                    </span>
                    <span className="text-system-yellow font-medium">
                        +{goal.type === 'daily' ? '10' : '50'} pts
                    </span>
                    {goal.recurrenceDays && goal.recurrenceDays.length > 0 && (
                        <span>• {goal.recurrenceDays.length} days/wk</span>
                    )}
                </p>
            </div>

            {/* Actions (Simple context menu or quick fail) */}
            <div className="flex items-center gap-2">
                {status !== 'failed' && status !== 'completed' && (
                    <button
                        onClick={() => onStatusChange('failed')}
                        className="p-2 text-system-gray hover:text-system-red transition-colors opacity-0 group-hover:opacity-100"
                        title="Mark as failed"
                    >
                        <X size={16} />
                    </button>
                )}
                {status !== 'open' && (
                    <button
                        onClick={() => onStatusChange('open')}
                        className="p-2 text-system-gray hover:text-white transition-colors"
                        title="Reset"
                    >
                        <RotateCcw size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
