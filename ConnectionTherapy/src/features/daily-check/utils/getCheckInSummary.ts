import { formatJournalDate } from "@utils/dates";
import { DailyCheck, Mood } from "../dailyCheck.types";
import { getMood } from "./moods";

export interface CheckInSummary {
    mood: Mood | null;
    title: string;
    detail: string;
    accessibilityLabel: string;
}

// What the Progress card says before and after today's check-in
export function getCheckInSummary(todayCheck: DailyCheck | null): CheckInSummary {
    const mood = getMood(todayCheck?.mood);
    if (!mood) {
        return {
            mood: null,
            title: "How are you today?",
            detail: "A minute to notice before the day carries you along",
            accessibilityLabel: "Check in for today",
        };
    }
    return {
        mood,
        title: `Feeling ${mood.label.toLowerCase()} today`,
        detail: todayCheck?.notes ?? "Tap to change it",
        accessibilityLabel: `Today you're feeling ${mood.label.toLowerCase()}. Edit check-in`,
    };
}

// One line in the history list: "October 5, 2026 · Great"
export function describeCheckIn(check: DailyCheck): { emoji: string; title: string } {
    const mood = getMood(check.mood);
    return {
        emoji: mood?.emoji ?? "",
        title: [formatJournalDate(check.date), mood?.label].filter(Boolean).join(" · "),
    };
}
