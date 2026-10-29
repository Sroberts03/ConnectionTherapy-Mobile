import { resolveCheckInDate } from "../../../../src/features/daily-check/utils/resolveCheckInDate";

const TODAY = "2026-10-29";

describe("resolveCheckInDate", () => {
    it("defaults to today", () => {
        expect(resolveCheckInDate(undefined, TODAY)).toBe(TODAY);
    });

    it("lets you fill in a day you missed", () => {
        expect(resolveCheckInDate("2026-10-20", TODAY)).toBe("2026-10-20");
    });

    it("won't check in for a day that hasn't happened", () => {
        expect(resolveCheckInDate("2026-10-30", TODAY)).toBe(TODAY);
    });

    it("ignores anything that isn't a date", () => {
        expect(resolveCheckInDate("yesterday", TODAY)).toBe(TODAY);
    });
});
