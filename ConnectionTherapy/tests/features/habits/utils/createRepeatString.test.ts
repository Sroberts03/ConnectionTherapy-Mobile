import createRepeatString from "../../../../src/features/habits/utils/createRepeatString";

describe("createRepeatString", () => {
    it("creates a daily recurrence string with an interval", () => {
        expect(
            createRepeatString("DAILY", 3, [], [], "")
        ).toBe("FREQ=DAILY;INTERVAL=3");
    });

    it("creates a weekly recurrence string with selected weekdays", () => {
        expect(
            createRepeatString("WEEKLY", 2, ["MO", "WE"], [], "")
        ).toBe("FREQ=WEEKLY;BYDAY=MO,WE;INTERVAL=2");
    });

    it("creates a monthly recurrence string using month day values", () => {
        expect(
            createRepeatString("MONTHLY", 1, [], [1, 15], "")
        ).toBe("FREQ=MONTHLY;BYMONTHDAY=1,15");
    });

    it("creates a monthly recurrence string using weekday offsets", () => {
        expect(
            createRepeatString("MONTHLY", 1, ["MO", "FR"], [], "1")
        ).toBe("FREQ=MONTHLY;BYDAY=1MO,1FR");
    });

    it("creates a yearly recurrence string", () => {
        expect(
            createRepeatString("YEARLY", 1, [], [], "")
        ).toBe("FREQ=YEARLY");
    });

    it("creates a yearly recurrence string with an interval", () => {
        expect(
            createRepeatString("YEARLY", 2, [], [], "")
        ).toBe("FREQ=YEARLY;INTERVAL=2");
    });

    it("returns an unknown frequency string when the frequency is unsupported", () => {
        expect(
            createRepeatString("HOURLY", 1, [], [], "")
        ).toBe("Unknown frequency");
    });
});
