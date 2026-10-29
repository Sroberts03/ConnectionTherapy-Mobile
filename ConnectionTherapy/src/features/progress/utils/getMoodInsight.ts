import { DailyCheck } from "@src/features/daily-check/dailyCheck.types";
import { getMoodForScore, getMoodScore } from "@src/features/daily-check/utils/moods";
import { MoodGroup, MoodInsight, PillarDay } from "../progress.types";
import { groupPillarsByDate } from "./getRequiredPillars";

// Fewer than this and an average says more about one odd day than about you
const MIN_CHECK_INS = 7;

// Splits at half your pillars, rounded up: with four pillars, 2+ against 0–1
export function getPillarThreshold(pillarCount: number): number {
    return Math.max(1, Math.ceil(pillarCount / 2));
}

function averageMood(checks: DailyCheck[], label: string): MoodGroup {
    const total = checks.reduce((sum, check) => sum + getMoodScore(check.mood), 0);
    return { label, mood: getMoodForScore(total / checks.length), days: checks.length };
}

// Do you feel better on days you look after more of your pillars?
export function getMoodInsight(checks: DailyCheck[], pillarDays: PillarDay[], pillarCount: number): MoodInsight {
    if (checks.length < MIN_CHECK_INS) {
        return { status: "needMoreCheckIns", remaining: MIN_CHECK_INS - checks.length };
    }
    const threshold = getPillarThreshold(pillarCount);
    const hitByDate = groupPillarsByDate(pillarDays);
    const isMore = (check: DailyCheck) => (hitByDate.get(check.date)?.size ?? 0) >= threshold;
    const moreDays = checks.filter(isMore);
    const fewerDays = checks.filter(check => !isMore(check));
    if (moreDays.length === 0 || fewerDays.length === 0) return { status: "needMix" };

    return {
        status: "ready",
        more: averageMood(moreDays, `${threshold}+ ${threshold === 1 ? "pillar" : "pillars"}`),
        fewer: averageMood(fewerDays, threshold === 1 ? "no pillars" : `0–${threshold - 1}`),
        checkIns: checks.length,
    };
}
