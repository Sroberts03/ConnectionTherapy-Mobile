import { HabitSpan, PillarDay } from "../progress.types";

// The pillars you'd started on a given day: a pillar only counts once it has a habit.
// Edited habits can store an empty end date, which means no end, same as null
export function getRequiredPillars(spans: HabitSpan[], date: string): Set<string> {
    return new Set(
        spans
            .filter(span => span.startDate <= date && (!span.endDate || span.endDate >= date))
            .map(span => span.category)
    );
}

export function groupPillarsByDate(pillarDays: PillarDay[]): Map<string, Set<string>> {
    const byDate = new Map<string, Set<string>>();
    pillarDays.forEach(({ date, category }) => {
        byDate.set(date, (byDate.get(date) ?? new Set()).add(category));
    });
    return byDate;
}
