import { MoodInsight } from "../progress.types";

// What to say while there isn't enough to compare yet
export function getMoodInsightMessage(insight: MoodInsight): string {
    if (insight.status === "needMoreCheckIns") {
        const days = insight.remaining === 1 ? "day" : "days";
        return `Check in ${insight.remaining} more ${days} to see how your mood lines up with your habits.`;
    }
    if (insight.status === "needMix") {
        return "Once you've had both fuller and quieter days, this compares how you felt on each.";
    }
    return "";
}
