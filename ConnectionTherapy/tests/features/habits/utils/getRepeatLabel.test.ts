import { getRepeatLabel } from "../../../../src/features/habits/utils/getRepeatLabel";

describe("getRepeatLabel", () => {
    it("returns the correct label for daily frequency", () => {
        expect(getRepeatLabel("FREQ=DAILY")).toBe("Daily");
    });

    it("returns the correct label for weekly frequency", () => {
        expect(getRepeatLabel("FREQ=WEEKLY")).toBe("Weekly");
    });

    it("returns the correct label for monthly frequency", () => {
        expect(getRepeatLabel("FREQ=MONTHLY")).toBe("Monthly");
    });

    it("returns the correct label for yearly frequency", () => {
        expect(getRepeatLabel("FREQ=YEARLY")).toBe("Yearly");
    });

    it("Weekdays", () => {
        expect(getRepeatLabel("FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR")).toBe("Weekdays");
    });

    it("Weekends", () => {
        expect(getRepeatLabel("FREQ=WEEKLY;BYDAY=SA,SU")).toBe("Weekends");
    });

    it("returns 'Custom' for unknown frequency", () => {
        expect(getRepeatLabel("FREQ=UNKNOWN")).toBe("Custom");
    });
});