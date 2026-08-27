import { formatRepeatStringToEnglish } from "../../../../src/features/habits/utils/FormatRepeatStringToEnglish";
import { DAY_OF_MONTH_INTERVAL_OPTIONS, DAYS_OF_WEEK } from "../../../../src/features/habits/utils/useCustomRepeat";

describe("formatRepeatStringToEnglish", () => {
    it("formats a daily recurrence string with an interval", () => {
        expect(
            formatRepeatStringToEnglish(3, "DAILY", [], [], "", [], [])
        ).toBe("Habit will occur every 3 days");
    });

    it("formats a daily recurrence string with an interval of 1", () => {
        expect(
            formatRepeatStringToEnglish(1, "DAILY", [], [], "", [], [])
        ).toBe("Habit will occur every 1 day");
    });

    it("formats a weekly recurrence string with selected weekdays", () => {
        expect(
            formatRepeatStringToEnglish(2, "WEEKLY", ["MO", "WE"], [], "", [], [])
        ).toBe("Habit will occur every 2 weeks on Monday, Wednesday");
    });

    it("formats a weekly recurrence string with selected weekdays with interval of 1", () => {
        expect(
            formatRepeatStringToEnglish(1, "WEEKLY", ["MO", "WE"], [], "", [], [])
        ).toBe("Habit will occur every 1 week on Monday, Wednesday");
    });

    it("formats a monthly recurrence string using month day values", () => {
        expect(
            formatRepeatStringToEnglish(1, "MONTHLY", [], [1, 15], "", [], [])
        ).toBe("Habit will occur every 1 month on the 1, 15");
    });

    it("formats a monthly recurrence string using month day values with interval of 2`", () => {
        expect(
            formatRepeatStringToEnglish(2, "MONTHLY", [], [1, 15], "", [], [])
        ).toBe("Habit will occur every 2 months on the 1, 15");
    });

    it("formats a monthly recurrence string using weekday offsets", () => {
        expect(
            formatRepeatStringToEnglish(1, "MONTHLY", ["MO"], [], "1", DAY_OF_MONTH_INTERVAL_OPTIONS, DAYS_OF_WEEK)
        ).toBe("Habit will occur every 1 month on the first Monday");
    });

    it("formats a yearly recurrence string", () => {
        expect(
            formatRepeatStringToEnglish(1, "YEARLY", [], [], "", [], [])
        ).toBe("Habit will occur every 1 year");
    });

    it("formats a yearly recurrence string with an interval of 2", () => {
        expect(
            formatRepeatStringToEnglish(2, "YEARLY", [], [], "", [], [])
        ).toBe("Habit will occur every 2 years");
    });

    it("returns an unknown frequency string when the frequency is unsupported", () => {
        expect(
            formatRepeatStringToEnglish(1, "HOURLY", [], [], "", [], [])
        ).toBe("Unknown frequency");
    });
});