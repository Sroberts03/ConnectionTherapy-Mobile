import { PillarHabit } from "../dashboard.types";

export interface PillarScore {
    percentage: number
    // Scheduled days before today; today isn't judged until it's over
    evaluatedDays: number
    // Days that went into the percentage, and how many of those had a habit done
    daysCounted: number
    daysShownUp: number
    hasHabits: boolean
}

// Share of scheduled days this week with at least one habit done.
// Only days a habit was actually due count, so a habit started mid-week
// isn't penalised for the days before it existed.
export function getPillarPercent(pillarHabits: PillarHabit[], today: string): PillarScore {
    const scheduledDays = new Set<string>();
    const completedDays = new Set<string>();
    pillarHabits.forEach((habit) => {
        scheduledDays.add(habit.completeBy);
        if (habit.isCompleted) {
            completedDays.add(habit.completeBy);
        }
    })

    const hasHabits = scheduledDays.size > 0;
    const pastDays = Array.from(scheduledDays).filter((day) => day < today);
    const daysCounted = completedDays.has(today) ? pastDays.length + 1 : pastDays.length;
    if (daysCounted === 0) {
        return { percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits };
    }

    const daysShownUp = Array.from(completedDays).filter((day) => day <= today).length;
    return {
        percentage: Math.round((daysShownUp / daysCounted) * 100),
        evaluatedDays: pastDays.length,
        daysCounted,
        daysShownUp,
        hasHabits
    };
}
