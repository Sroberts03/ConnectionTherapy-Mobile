import { ConnectionPillar } from "../dashboard.types";

interface PillarStatus {
    // False until there's something to show: a completed day, or enough days that a 0% is fair
    hasScore: boolean;
    label: string;
    // The longer read used on Progress and by screen readers
    detail: string;
}

// A miss in the first couple of days is too early to call 0%
const DAYS_BEFORE_ZERO = 3;

type PillarStatusInput = Pick<ConnectionPillar, 'percentage' | 'daysCounted' | 'daysShownUp' | 'hasHabits'>;

export function getPillarStatus(pillar: PillarStatusInput): PillarStatus {
    if (!pillar.hasHabits) {
        return { hasScore: false, label: "Add a habit", detail: "No habits yet" };
    }
    if (pillar.daysCounted === 0) {
        return { hasScore: false, label: "Just starting", detail: "Your first day counts once it's done" };
    }
    const dayWord = pillar.daysCounted === 1 ? "day" : "days";
    const showedUp = `Showed up ${pillar.daysShownUp} of ${pillar.daysCounted} ${dayWord}`;
    if (pillar.daysShownUp === 0 && pillar.daysCounted < DAYS_BEFORE_ZERO) {
        return { hasScore: false, label: "Just starting", detail: `${showedUp} so far` };
    }
    return { hasScore: true, label: `${pillar.percentage}%`, detail: showedUp };
}

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// How this week compares with last, once both have a score
export function getWeekChange(percentage: number, lastWeekPercentage: number | null): string | null {
    if (lastWeekPercentage === null) return null;
    const diff = percentage - lastWeekPercentage;
    if (diff === 0) return "Same as last week";
    return `${diff > 0 ? "↑" : "↓"} ${Math.abs(diff)} vs last week`;
}
