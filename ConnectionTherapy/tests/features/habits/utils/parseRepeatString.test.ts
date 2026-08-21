import { parseRepeatString } from "../../../../src/features/habits/utils/parseRepeatString";

describe("parseRepeatString", () => {
    it("returns the correct label for daily frequency", () => {
        expect(parseRepeatString("FREQ=DAILY")).toBe("Daily");
    });

    it("returns the correct label for weekly frequency", () => {
        expect(parseRepeatString("FREQ=WEEKLY")).toBe("Weekly");
    });

    it("returns the correct label for monthly frequency", () => {
        expect(parseRepeatString("FREQ=MONTHLY")).toBe("Monthly");
    });

    it("returns the correct label for yearly frequency", () => {
        expect(parseRepeatString("FREQ=YEARLY")).toBe("Yearly");
    });

    it("returns 'custom' for unknown frequency", () => {
        expect(parseRepeatString("FREQ=UNKNOWN")).toBe("custom");
    });

    it("returns 'custom' for empty string", () => {
        expect(parseRepeatString("")).toBe("custom");
    });

    it("returns 'None' for None", () => {
        expect(parseRepeatString("None")).toBe("None");
    });
});
