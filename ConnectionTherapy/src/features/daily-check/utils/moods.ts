import { Mood, MoodKey } from "../dailyCheck.types";

// Worst to best, so the row reads left to right like a scale
export const MOODS: Mood[] = [
    { key: "rough", emoji: "😣", label: "Rough" },
    { key: "low", emoji: "😕", label: "Low" },
    { key: "okay", emoji: "😐", label: "Okay" },
    { key: "good", emoji: "🙂", label: "Good" },
    { key: "great", emoji: "😄", label: "Great" },
];

// Rows are stored as text, so anything unrecognised reads as no mood rather than crashing
export function getMood(key: string | null | undefined): Mood | null {
    return MOODS.find(mood => mood.key === key) ?? null;
}

export function isMoodKey(key: string): key is MoodKey {
    return getMood(key) !== null;
}

// Rough is 1, Great is 5, so moods can be averaged
export function getMoodScore(key: MoodKey): number {
    return MOODS.findIndex(mood => mood.key === key) + 1;
}

export function getMoodForScore(score: number): Mood {
    const index = Math.min(Math.max(Math.round(score), 1), MOODS.length) - 1;
    return MOODS[index]!;
}
