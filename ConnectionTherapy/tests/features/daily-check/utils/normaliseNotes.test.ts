import { normaliseNotes } from "../../../../src/features/daily-check/utils/normaliseNotes";

describe("normaliseNotes", () => {
    it("trims what was written", () => {
        expect(normaliseNotes("  tired but ok \n")).toBe("tired but ok");
    });

    it("treats a blank note as no note", () => {
        expect(normaliseNotes("")).toBeNull();
        expect(normaliseNotes("   \n ")).toBeNull();
    });
});
