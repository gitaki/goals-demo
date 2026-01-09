import { isSameDay, getDay, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

export const DAYS_OF_WEEK = [
    { id: 1, label: 'M', full: 'Monday' },
    { id: 2, label: 'T', full: 'Tuesday' },
    { id: 3, label: 'W', full: 'Wednesday' },
    { id: 4, label: 'T', full: 'Thursday' },
    { id: 5, label: 'F', full: 'Friday' },
    { id: 6, label: 'S', full: 'Saturday' },
    { id: 0, label: 'S', full: 'Sunday' },
];

export function isGoalDueOnDate(goal, date) {
    const checkDate = startOfDay(new Date(date));
    // Handle DB snake_case vs JS camelCase if mix happened
    const startDate = goal.start_date || goal.startDate || goal.createdAt || goal.created_at;
    const goalStart = startOfDay(new Date(startDate));

    // If goal hasn't started yet
    if (isBefore(checkDate, goalStart)) {
        return false;
    }

    // Check end date if exists
    const endDate = goal.end_date || goal.endDate;
    if (endDate) {
        const goalEnd = endOfDay(new Date(endDate));
        if (isAfter(checkDate, goalEnd)) {
            return false;
        }
    }

    if (goal.type === 'weekly') {
        // For weekly goals, they appear every day of the week if active
        return true;
    }

    if (goal.type === 'daily') {
        const days = goal.recurrence_days || goal.recurrenceDays;

        if (!days || days.length === 0) {
            // If it's a one-off daily goal with a specific targetDate
            // (Simplified logic here, assuming daily always uses recurrence for this demo)
            return true;
        }

        const dayOfWeek = getDay(checkDate); // 0 (Sun) - 6 (Sat)
        return days.includes(dayOfWeek);
    }

    return false;
}
