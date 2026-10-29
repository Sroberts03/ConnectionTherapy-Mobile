import { ConnectionPillar } from "../dashboard.types";

interface PillarStatus {
    // False until a day has been counted, so a new week doesn't open on a wall of 0%
    hasScore: boolean;
    label: string;
    // The longer read used on Progress and by screen readers
    detail: string;
}

type PillarStatusInput = Pick<ConnectionPillar, 'percentage' | 'daysCounted' | 'daysShownUp' | 'hasHabits'>;

export function getPillarStatus(pillar: PillarStatusInput): PillarStatus {
    if (!pillar.hasHabits) {
        return { hasScore: false, label: "Add a habit", detail: "No habits yet" };
    }
    if (pillar.daysCounted === 0) {
        return { hasScore: false, label: "Just starting", detail: "Your first day counts once it's done" };
    }
    const dayWord = pillar.daysCounted === 1 ? "day" : "days";
    return {
        hasScore: true,
        label: `${pillar.percentage}%`,
        detail: `Showed up ${pillar.daysShownUp} of ${pillar.daysCounted} ${dayWord}`
    };
}

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
