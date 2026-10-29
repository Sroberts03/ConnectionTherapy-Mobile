import { ConnectionPillar } from "../dashboard.types";

interface PillarStatus {
    // False until a day has been counted, so a new week doesn't open on a wall of 0%
    hasScore: boolean;
    label: string;
}

export function getPillarStatus(pillar: Pick<ConnectionPillar, 'percentage' | 'daysCounted' | 'hasHabits'>): PillarStatus {
    if (!pillar.hasHabits) {
        return { hasScore: false, label: "Add a habit" };
    }
    if (pillar.daysCounted === 0) {
        return { hasScore: false, label: "Just starting" };
    }
    return { hasScore: true, label: `${pillar.percentage}%` };
}
