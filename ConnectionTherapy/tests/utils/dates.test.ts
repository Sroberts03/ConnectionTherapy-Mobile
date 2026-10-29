import { formatJournalDate, parseDateString, daysBetween, addDays } from "@utils/dates";

describe("formatJournalDate", () => {
    it("formats a date string to 'Month Day, Year' format", () => {
        const dateStr = "2024-06-15";
        const formattedDate = formatJournalDate(dateStr);
        expect(formattedDate).toBe("June 15, 2024");
    });

    it("handles different date strings correctly", () => {
        const dateStr = "2023-12-01";
        const formattedDate = formatJournalDate(dateStr);
        expect(formattedDate).toBe("December 1, 2023");
    });

    it("returns 'Invalid Date' for invalid date strings", () => {
        const dateStr = "invalid-date";
        const formattedDate = formatJournalDate(dateStr);
        expect(formattedDate).toBe("Invalid Date");
    });
});

describe("parseDateString", () => {
    it("reads a YYYY-MM-DD string as that local date", () => {
        const date = parseDateString("2026-10-29");
        expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 9, 29]);
    });

    it("falls back to today when no date is chosen", () => {
        expect(parseDateString(null).toDateString()).toBe(new Date().toDateString());
    });
});

describe("daysBetween", () => {
    it("counts whole days between two dates", () => {
        expect(daysBetween("2026-10-25", "2026-10-29")).toBe(4);
    });

    it("is zero for the same day", () => {
        expect(daysBetween("2026-10-29", "2026-10-29")).toBe(0);
    });

    it("stays whole across a daylight-saving change", () => {
        expect(daysBetween("2026-10-31", "2026-11-02")).toBe(2);
    });
});

describe("addDays", () => {
    it("moves forward and back across months", () => {
        expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
        expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    });
});
