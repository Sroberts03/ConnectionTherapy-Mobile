import { Mood } from "@src/features/daily-check/dailyCheck.types";

// A day on which at least one habit in this pillar was done
export interface PillarDay {
    date: string;
    category: string;
}

export interface HabitSpan {
    category: string;
    startDate: string;
    endDate: string | null;
}

export interface Streak {
    current: number;
    best: number;
    todayFull: boolean;
}

export interface MoodGroup {
    label: string;
    mood: Mood;
    days: number;
}

export type MoodInsight =
    | { status: "needMoreCheckIns"; remaining: number }
    | { status: "needMix" }
    | { status: "ready"; more: MoodGroup; fewer: MoodGroup; checkIns: number };
