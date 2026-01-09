import React, { useState } from 'react';
import { useGoals } from '../context/GoalContext';
import { isGoalDueOnDate } from '../utils/recurrenceUtils';
import GoalCard from './GoalCard';
import AddGoalForm from './AddGoalForm';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function GoalsList() {
    const { goals, getGoalStatus, toggleGoalStatus } = useGoals();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Filter goals for the current view
    const todaysGoals = goals.filter(goal => isGoalDueOnDate(goal, currentDate));

    const sortedGoals = [...todaysGoals].sort((a, b) => {
        // Sort by status (open first), then creation
        const statusA = getGoalStatus(a.id, currentDate);
        const statusB = getGoalStatus(b.id, currentDate);
        if (statusA === 'open' && statusB !== 'open') return -1;
        if (statusA !== 'open' && statusB === 'open') return 1;
        return 0;
    });

    const handleDateChange = (days) => {
        setCurrentDate(prev => addDays(prev, days));
    };

    const isToday = isSameDay(currentDate, new Date());

    return (
        <div className="space-y-6">
            {/* Date Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={() => handleDateChange(-1)} className="p-2 bg-system-bg-secondary rounded-full">
                        <ChevronLeft size={20} className="text-system-blue" />
                    </button>
                    {!isToday && (
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className="text-xs font-semibold text-system-blue bg-system-blue/10 px-2 py-1 rounded"
                        >
                            Today
                        </button>
                    )}
                </div>
                <div className="text-center flex-1">
                    <h2 className="text-lg font-bold">
                        {isToday ? 'Today' : format(currentDate, 'EEEE')}
                    </h2>
                    <div className="text-sm text-system-gray">
                        {format(currentDate, 'MMM d, yyyy')}
                    </div>
                </div>
                <button onClick={() => handleDateChange(1)} className="p-2 bg-system-bg-secondary rounded-full">
                    <ChevronRight size={20} className="text-system-blue" />
                </button>
            </div>

            {/* Stats/Progress could go here */}

            {/* List */}
            <div className="space-y-3 pb-24">
                {sortedGoals.length === 0 ? (
                    <div className="text-center py-10 text-system-gray2">
                        <p>No goals for this day.</p>
                    </div>
                ) : (
                    sortedGoals.map(goal => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            status={getGoalStatus(goal.id, currentDate)}
                            onStatusChange={(newStatus) => toggleGoalStatus(goal.id, currentDate, newStatus)}
                        />
                    ))
                )}
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-system-blue rounded-full flex items-center justify-center shadow-lg shadow-blue-900/40 active:scale-90 transition-transform z-40"
            >
                <Plus size={28} color="white" strokeWidth={2.5} />
            </button>

            {isAddModalOpen && <AddGoalForm onClose={() => setIsAddModalOpen(false)} />}
        </div>
    );
}
