import { getWeekStrip } from "../../../../src/features/daily-check/utils/getWeekStrip";

const SUNDAY = "2026-10-25";
const THURSDAY = "2026-10-29";

describe("getWeekStrip", () => {
    it("lays out Sunday to Saturday", () => {
        const week = getWeekStrip(SUNDAY, THURSDAY, []);
        expect(week.map(day => day.date)).toEqual([
            "2026-10-25", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31",
        ]);
        expect(week.map(day => day.letter).join("")).toBe("SMTWTFS");
    });

    it("marks today and the days still to come", () => {
        const week = getWeekStrip(SUNDAY, THURSDAY, []);
        expect(week.filter(day => day.isToday).map(day => day.date)).toEqual([THURSDAY]);
        expect(week.filter(day => day.isFuture).map(day => day.date)).toEqual(["2026-10-30", "2026-10-31"]);
    });

    it("puts each check-in's mood on its day and leaves the rest empty", () => {
        const week = getWeekStrip(SUNDAY, THURSDAY, [
            { id: 1, date: "2026-10-26", mood: "low", notes: null },
            { id: 2, date: THURSDAY, mood: "great", notes: "Good run" },
        ]);
        expect(week[1]?.mood?.key).toBe("low");
        expect(week[4]?.mood?.key).toBe("great");
        expect(week.filter(day => day.mood).length).toBe(2);
    });

    it("crosses a month boundary", () => {
        const week = getWeekStrip("2026-11-29", "2026-11-29", []);
        expect(week[2]?.date).toBe("2026-12-01");
    });
});
