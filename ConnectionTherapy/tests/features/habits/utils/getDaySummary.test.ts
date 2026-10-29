import { getDaySummary } from "../../../../src/features/habits/utils/getDaySummary";

describe("getDaySummary", () => {
    it("nudges gently when nothing is planned", () => {
        expect(getDaySummary(0, 0, true)).toEqual({
            message: "Nothing planned today. One small habit is a good start.",
            percentDone: null
        });
    });

    it("counts progress through the day", () => {
        expect(getDaySummary(1, 3, true)).toEqual({ message: "1 of 3 done today", percentDone: 33 });
    });

    it("celebrates a finished day", () => {
        expect(getDaySummary(2, 2, true)).toEqual({ message: "All 2 done today. Nicely done 🌱", percentDone: 100 });
    });

    it("skips the count when the only habit is done", () => {
        expect(getDaySummary(1, 1, true).message).toBe("Done today. Nicely done 🌱");
    });

    it("speaks about other days without saying today", () => {
        expect(getDaySummary(0, 1, false).message).toBe("0 of 1 done this day");
    });
});
