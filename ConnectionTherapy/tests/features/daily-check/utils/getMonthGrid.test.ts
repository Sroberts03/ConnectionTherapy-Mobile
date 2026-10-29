import { formatMonthTitle, getMonthEnd, getMonthGrid, getMonthStart, shiftMonth } from "../../../../src/features/daily-check/utils/getMonthGrid";

describe("month helpers", () => {
    it("finds the first of the month", () => {
        expect(getMonthStart("2026-10-29")).toBe("2026-10-01");
    });

    it("steps across year boundaries", () => {
        expect(shiftMonth("2026-01-01", -1)).toBe("2025-12-01");
        expect(shiftMonth("2026-12-01", 1)).toBe("2027-01-01");
    });

    it("knows how long each month is", () => {
        expect(getMonthEnd("2026-02-01")).toBe("2026-02-28");
        expect(getMonthEnd("2028-02-01")).toBe("2028-02-29");
        expect(getMonthEnd("2026-10-01")).toBe("2026-10-31");
    });

    it("titles the month", () => {
        expect(formatMonthTitle("2026-10-01")).toBe("October 2026");
    });
});

describe("getMonthGrid", () => {
    // October 2026 starts on a Thursday and has 31 days
    const rows = getMonthGrid("2026-10-01", "2026-10-29", [{ id: 1, date: "2026-10-05", mood: "great", notes: null }]);
    const days = rows.flat();

    it("pads to whole Sunday-first weeks", () => {
        expect(rows.every(row => row.length === 7)).toBe(true);
        expect(days.slice(0, 4)).toEqual([null, null, null, null]);
        expect(days[4]?.date).toBe("2026-10-01");
        expect(days.filter(Boolean).length).toBe(31);
    });

    it("places moods, today and future days", () => {
        const byDate = new Map(days.filter(day => day !== null).map(day => [day!.date, day!]));
        expect(byDate.get("2026-10-05")?.mood?.key).toBe("great");
        expect(byDate.get("2026-10-29")?.isToday).toBe(true);
        expect(byDate.get("2026-10-30")?.isFuture).toBe(true);
        expect(byDate.get("2026-10-28")?.isFuture).toBe(false);
    });
});
