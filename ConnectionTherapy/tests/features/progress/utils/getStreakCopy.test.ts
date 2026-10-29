import { getStreakCopy } from "@src/features/progress/utils/getStreakCopy";

describe("getStreakCopy", () => {
    it("explains a full day before there's a streak", () => {
        expect(getStreakCopy({ current: 0, best: 0, todayFull: false }).title).toBe("No full days yet");
    });

    it("nudges you to keep it going today", () => {
        expect(getStreakCopy({ current: 3, best: 5, todayFull: false }))
            .toEqual({ title: "3 full days in a row", detail: "Finish today to make it 4" });
    });

    it("shows the best once today is done", () => {
        expect(getStreakCopy({ current: 1, best: 1, todayFull: true }))
            .toEqual({ title: "1 full day in a row", detail: "Best: 1 full day" });
    });
});
