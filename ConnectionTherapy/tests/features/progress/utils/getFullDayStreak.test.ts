import { getFullDayStreak } from "@src/features/progress/utils/getFullDayStreak";
import { HabitSpan, PillarDay } from "@src/features/progress/progress.types";

const TODAY = "2026-10-29";
const both: HabitSpan[] = [
    { category: "Social", startDate: "2026-10-20", endDate: null },
    { category: "Physical", startDate: "2026-10-20", endDate: null },
];
const full = (date: string): PillarDay[] => [{ date, category: "Social" }, { date, category: "Physical" }];

describe("getFullDayStreak", () => {
    it("is empty before any habit", () => {
        expect(getFullDayStreak([], [], TODAY)).toEqual({ current: 0, best: 0, todayFull: false });
    });

    it("counts back from yesterday while today is still open", () => {
        const days = [...full("2026-10-26"), ...full("2026-10-27"), ...full("2026-10-28")];
        expect(getFullDayStreak(days, both, TODAY)).toEqual({ current: 3, best: 3, todayFull: false });
    });

    it("adds today once it's full", () => {
        const days = [...full("2026-10-28"), ...full(TODAY)];
        expect(getFullDayStreak(days, both, TODAY)).toEqual({ current: 2, best: 2, todayFull: true });
    });

    it("needs every pillar, not just one", () => {
        const days = [...full("2026-10-27"), { date: "2026-10-28", category: "Social" }];
        expect(getFullDayStreak(days, both, TODAY).current).toBe(0);
    });

    it("remembers the best run after a break", () => {
        const days = [...full("2026-10-21"), ...full("2026-10-22"), ...full("2026-10-23"), ...full("2026-10-28")];
        expect(getFullDayStreak(days, both, TODAY)).toMatchObject({ current: 1, best: 3 });
    });

    it("only asks for a pillar once it had a habit", () => {
        const spans: HabitSpan[] = [
            { category: "Social", startDate: "2026-10-20", endDate: null },
            { category: "Physical", startDate: "2026-10-28", endDate: null },
        ];
        const days = [{ date: "2026-10-27", category: "Social" }, ...full("2026-10-28")];
        expect(getFullDayStreak(days, spans, TODAY).current).toBe(2);
    });

    it("stops asking for a pillar after its habit ended", () => {
        const spans: HabitSpan[] = [
            { category: "Social", startDate: "2026-10-20", endDate: null },
            { category: "Physical", startDate: "2026-10-20", endDate: "2026-10-27" },
        ];
        expect(getFullDayStreak([{ date: "2026-10-28", category: "Social" }], spans, TODAY).current).toBe(1);
    });

    it("treats an empty end date as no end", () => {
        const spans: HabitSpan[] = [{ category: "Spiritual", startDate: TODAY, endDate: "" }];
        expect(getFullDayStreak([{ date: TODAY, category: "Spiritual" }], spans, TODAY)).toEqual({ current: 1, best: 1, todayFull: true });
    });
});
