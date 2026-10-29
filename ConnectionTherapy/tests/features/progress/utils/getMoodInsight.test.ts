import { getMoodInsight, getPillarThreshold } from "@src/features/progress/utils/getMoodInsight";
import { getMoodInsightMessage } from "@src/features/progress/utils/getMoodInsightMessage";
import { DailyCheck, MoodKey } from "@src/features/daily-check/dailyCheck.types";
import { PillarDay } from "@src/features/progress/progress.types";

const check = (day: number, mood: MoodKey): DailyCheck => ({ id: day, date: `2026-10-${String(day).padStart(2, "0")}`, mood, notes: null });
const hit = (day: number, ...categories: string[]): PillarDay[] =>
    categories.map(category => ({ date: `2026-10-${String(day).padStart(2, "0")}`, category }));

describe("getPillarThreshold", () => {
    it("splits at half, rounded up, never below one", () => {
        expect(getPillarThreshold(4)).toBe(2);
        expect(getPillarThreshold(3)).toBe(2);
        expect(getPillarThreshold(1)).toBe(1);
        expect(getPillarThreshold(0)).toBe(1);
    });
});

describe("getMoodInsight", () => {
    it("waits for a week of check-ins", () => {
        const insight = getMoodInsight([check(1, "good"), check(2, "low")], [], 4);
        expect(insight).toEqual({ status: "needMoreCheckIns", remaining: 5 });
        expect(getMoodInsightMessage(insight)).toBe("Check in 5 more days to see how your mood lines up with your habits.");
    });

    it("waits for both kinds of day", () => {
        const checks = [1, 2, 3, 4, 5, 6, 7].map(day => check(day, "okay"));
        expect(getMoodInsight(checks, [], 4)).toEqual({ status: "needMix" });
    });

    it("compares average mood on fuller and quieter days", () => {
        const checks = [check(1, "great"), check(2, "good"), check(3, "good"), check(4, "low"), check(5, "rough"), check(6, "low"), check(7, "okay")];
        const pillarDays = [...hit(1, "Social", "Physical"), ...hit(2, "Social", "Spiritual"), ...hit(3, "Social", "Physical", "Spiritual"), ...hit(4, "Social")];
        const insight = getMoodInsight(checks, pillarDays, 4);
        expect(insight).toMatchObject({
            status: "ready",
            checkIns: 7,
            more: { label: "2+ pillars", days: 3, mood: { key: "good" } },
            fewer: { label: "0–1", days: 4, mood: { key: "low" } },
        });
    });
});
