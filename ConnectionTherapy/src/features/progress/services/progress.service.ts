import { getDailyChecks } from "@src/features/daily-check/services/dailyCheck.service";
import { MoodInsight, Streak } from "../progress.types";
import { getFullDayStreak } from "../utils/getFullDayStreak";
import { getMoodInsight } from "../utils/getMoodInsight";
import { getActiveHabitSpansDataAccess, getCompletedPillarDaysDataAccess } from "./progress.dataAccess";

const BEGINNING = "0000-01-01";

export async function getProgressInsights(userId: string, today: string): Promise<{ streak: Streak; moodInsight: MoodInsight }> {
    const [pillarDays, spans, checks] = await Promise.all([
        getCompletedPillarDaysDataAccess(userId),
        getActiveHabitSpansDataAccess(userId),
        getDailyChecks(userId, BEGINNING, today),
    ]);
    const pillarCount = new Set(spans.map(span => span.category)).size;
    return {
        streak: getFullDayStreak(pillarDays, spans, today),
        moodInsight: getMoodInsight(checks, pillarDays, pillarCount),
    };
}
