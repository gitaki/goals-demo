import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabaseClient';

const GoalContext = createContext();

const STORAGE_KEY_GOALS = 'family_goals_data';
const STORAGE_KEY_RECORDS = 'family_goals_records';

export function GoalProvider({ children }) {
    const [goals, setGoals] = useState([]);
    const [records, setRecords] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                // Fetch Goals
                const { data: goalsData, error: goalsError } = await supabase
                    .from('goals')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (goalsError) throw goalsError;

                // Fetch Records
                const { data: recordsData, error: recordsError } = await supabase
                    .from('goal_records')
                    .select('*');

                if (recordsError) throw recordsError;

                setGoals(goalsData || []);

                // Transform records array to map: { "goalId_YYYY-MM-DD": status }
                const recordsMap = {};
                if (recordsData) {
                    recordsData.forEach(r => {
                        recordsMap[`${r.goal_id}_${r.date_key}`] = r.status;
                    });
                }
                setRecords(recordsMap);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const addGoal = async (newGoal) => {
        // Optimistic Update
        const tempId = crypto.randomUUID();
        const goalToSave = {
            ...newGoal,
            // Ensure arrays are formatted for Postgres if needed, though JS array works fine for jsonb/array columns usually
            // Supabase JS client handles array conversion for integer[] columns
        };

        // DB field mapping if needed (our schema uses snake_case, js uses camelCase)
        // We need to map camelCase params to snake_case db columns
        const dbGoal = {
            title: newGoal.title,
            type: newGoal.type,
            start_date: newGoal.startDate,
            end_date: newGoal.endDate || null,
            recurrence_days: newGoal.recurrenceDays,
            created_at: newGoal.createdAt
        };

        setGoals(prev => [...prev, { ...dbGoal, id: tempId }]); // Optimistic

        const { data, error } = await supabase
            .from('goals')
            .insert([dbGoal])
            .select();

        if (error) {
            console.error('Error creating goal:', error);
            // Revert on error (simplified for demo)
            setGoals(prev => prev.filter(g => g.id !== tempId));
            return;
        }

        // Update ID with real one from DB
        if (data && data[0]) {
            setGoals(prev => prev.map(g => g.id === tempId ? data[0] : g));
        }
    };

    const deleteGoal = async (goalId) => {
        setGoals(prev => prev.filter(g => g.id !== goalId));

        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', goalId);

        if (error) {
            console.error("Error deleting goal", error);
            // simple revert: fetch again or rely on user refresh
        }
    };

    const toggleGoalStatus = async (goalId, date, newStatus) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const key = `${goalId}_${dateKey}`;

        // Optimistic update
        setRecords(prev => {
            const next = { ...prev };
            if (!newStatus || newStatus === 'open') {
                delete next[key];
            } else {
                next[key] = newStatus;
            }
            return next;
        });

        // DB Update
        if (!newStatus || newStatus === 'open') {
            // Delete record
            const { error } = await supabase
                .from('goal_records')
                .delete()
                .match({ goal_id: goalId, date_key: dateKey });

            if (error) console.error("Error deleting record", error);
        } else {
            // Upsert record
            const { error } = await supabase
                .from('goal_records')
                .upsert({
                    goal_id: goalId,
                    date_key: dateKey,
                    status: newStatus
                }, { onConflict: 'goal_id, date_key' });

            if (error) console.error("Error updating record", error);
        }
    };

    const getGoalStatus = (goalId, date) => {
        const key = `${goalId}_${format(date, 'yyyy-MM-dd')}`;
        return records[key] || 'open';
    };

    return (
        <GoalContext.Provider value={{
            goals,
            addGoal,
            deleteGoal,
            toggleGoalStatus,
            getGoalStatus,
            loading
        }}>
            {children}
        </GoalContext.Provider>
    );
}

export const useGoals = () => useContext(GoalContext);
