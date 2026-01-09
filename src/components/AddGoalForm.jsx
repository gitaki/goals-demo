import React, { useState } from 'react';
import { useGoals } from '../context/GoalContext';
import { DAYS_OF_WEEK } from '../utils/recurrenceUtils';
import { X, Calendar, Repeat } from 'lucide-react';
import { format } from 'date-fns';

export default function AddGoalForm({ onClose }) {
    const { addGoal } = useGoals();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('daily'); // 'daily' | 'weekly'
    const [recurrenceDays, setRecurrenceDays] = useState([]); // indices 0-6
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState('');
    const [isRecurring, setIsRecurring] = useState(true); // Default to recurring for Daily

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const goal = {
            title,
            type,
            startDate,
            // If daily and recurring, save recurrenceDays. If not recurring, it's a one-off (use targetDate logic if needed, but for now we simplify)
            // Actually, if it's daily and NOT recurring, maybe we treat it as a single target date?
            // Let's stick to the prompt: "recurrence for daily goal... recurrence for weekly goal".
            recurrenceDays: type === 'daily' && isRecurring ? recurrenceDays : [],
            endDate: endDate || null,
            createdAt: new Date().toISOString(),
        };

        addGoal(goal);
        onClose();
    };

    const toggleDay = (dayId) => {
        setRecurrenceDays(prev =>
            prev.includes(dayId)
                ? prev.filter(d => d !== dayId)
                : [...prev, dayId].sort()
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-system-bg-secondary rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold">New Goal</h2>
                    <button onClick={onClose} className="p-2 bg-system-gray3 rounded-full hover:bg-white/20 transition">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-xs text-system-gray mb-1 uppercase tracking-wider">Goal Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., Read 20 pages"
                            className="w-full bg-system-bg-tertiary rounded-lg p-3 text-white placeholder-system-gray focus:outline-none focus:ring-1 focus:ring-system-blue"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setType('daily')}
                            className={`p-3 rounded-lg text-sm font-medium transition ${type === 'daily' ? 'bg-system-blue text-white' : 'bg-system-bg-tertiary text-system-gray'
                                }`}
                        >
                            Daily
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('weekly')}
                            className={`p-3 rounded-lg text-sm font-medium transition ${type === 'weekly' ? 'bg-system-purple text-white' : 'bg-system-bg-tertiary text-system-gray'
                                }`}
                        >
                            Weekly
                        </button>
                    </div>

                    {/* Date Settings */}
                    <div className="space-y-3 bg-system-bg-tertiary rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Start Date</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="bg-transparent text-right text-system-blue focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Recurrence Settings */}
                    {type === 'daily' && (
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs text-system-gray uppercase tracking-wider">Repeats On</label>
                                </div>
                                <div className="flex justify-between">
                                    {DAYS_OF_WEEK.map(day => (
                                        <button
                                            key={day.id}
                                            type="button"
                                            onClick={() => toggleDay(day.id)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${recurrenceDays.includes(day.id)
                                                    ? 'bg-system-blue text-white'
                                                    : 'bg-system-bg-tertiary text-system-gray'
                                                }`}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 bg-system-bg-tertiary rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">End Date (Optional)</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="bg-transparent text-right text-system-gray focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-100 transition active:scale-[0.98] mt-4"
                    >
                        Create Goal
                    </button>
                </form>
            </div>
        </div>
    );
}
