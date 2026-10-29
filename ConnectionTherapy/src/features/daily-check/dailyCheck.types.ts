export type MoodKey = "rough" | "low" | "okay" | "good" | "great";

export interface Mood {
    key: MoodKey;
    emoji: string;
    label: string;
}

export interface DailyCheck {
    id: number;
    date: string;
    mood: MoodKey;
    notes: string | null;
}

export interface DailyCheckInput {
    date: string;
    mood: MoodKey;
    notes: string | null;
}

export interface WeekDay {
    date: string;
    letter: string;
    mood: Mood | null;
    isToday: boolean;
    isFuture: boolean;
}
