import { PillarHabit } from "../dashboard.types";
import { daysBetween } from "../../../utils/dates";

export interface PillarScore {
    percentage: number
    // Finished days in the window; today isn't judged until it's over
    evaluatedDays: number
    // Days that went into the percentage, and how many of those had a habit done
    daysCounted: number
    daysShownUp: number
    hasHabits: boolean
}

// Count from Sunday, or from the user's first habit if that came later this week
export function getCountFrom(startOfWeek: string, firstStart: string | null): string {
    return firstStart && firstStart > startOfWeek ? firstStart : startOfWeek;
}

// The goal is one habit in every pillar every day, so every day counts, not just days a habit was due.
// The window opens at countFrom (the later of the week's start and the user's first habit),
// so nobody is marked down for days before they started using the app.
export function getPillarPercent(pillarHabits: PillarHabit[], today: string, countFrom: string): PillarScore {
    const completedDays = new Set(
        pillarHabits
            .filter((habit) => habit.isCompleted && habit.completeBy >= countFrom && habit.completeBy <= today)
            .map((habit) => habit.completeBy)
    );

    const hasHabits = pillarHabits.length > 0;
    const evaluatedDays = Math.max(daysBetween(countFrom, today), 0);
    const daysCounted = completedDays.has(today) ? evaluatedDays + 1 : evaluatedDays;
    if (daysCounted === 0) {
        return { percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits };
    }

    const daysShownUp = completedDays.size;
    return {
        percentage: Math.round((daysShownUp / daysCounted) * 100),
        evaluatedDays,
        daysCounted,
        daysShownUp,
        hasHabits
    };
}


// A finished week: every day from Sunday to Saturday counts, judged as of the next Sunday.
// Null when the pillar had nothing that week, or the user hadn't started yet, so there's nothing fair to compare against
export function getLastWeekPercent(pillarHabits: PillarHabit[], lastWeekStart: string, thisWeekStart: string, firstStart: string | null): number | null {
    if (pillarHabits.length === 0) return null;
    const score = getPillarPercent(pillarHabits, thisWeekStart, getCountFrom(lastWeekStart, firstStart));
    return score.daysCounted === 0 ? null : score.percentage;
}
