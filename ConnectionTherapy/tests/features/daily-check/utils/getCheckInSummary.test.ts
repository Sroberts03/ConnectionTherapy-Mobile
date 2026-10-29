import { describeCheckIn, getCheckInSummary } from "../../../../src/features/daily-check/utils/getCheckInSummary";

describe("getCheckInSummary", () => {
    it("invites a check-in when there isn't one yet", () => {
        const summary = getCheckInSummary(null);
        expect(summary.mood).toBeNull();
        expect(summary.title).toBe("How are you today?");
    });

    it("reflects today's mood and note back", () => {
        const summary = getCheckInSummary({ id: 1, date: "2026-10-29", mood: "good", notes: "Long walk" });
        expect(summary.title).toBe("Feeling good today");
        expect(summary.detail).toBe("Long walk");
    });

    it("offers to edit when there's no note", () => {
        const summary = getCheckInSummary({ id: 1, date: "2026-10-29", mood: "low", notes: null });
        expect(summary.detail).toBe("Tap to change it");
        expect(summary.accessibilityLabel).toContain("Edit");
    });
});

describe("describeCheckIn", () => {
    it("pairs the date with the mood", () => {
        expect(describeCheckIn({ id: 1, date: "2026-10-05", mood: "great", notes: null }))
            .toEqual({ emoji: "😄", title: "October 5, 2026 · Great" });
    });
});
