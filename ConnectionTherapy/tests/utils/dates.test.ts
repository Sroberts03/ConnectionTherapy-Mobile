import { formatJournalDate } from "@utils/dates";

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
