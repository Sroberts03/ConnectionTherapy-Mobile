import { capitalize, getPillarStatus, getWeekChange } from "../../../../src/features/dashboard/utils/getPillarStatus";

describe("getPillarStatus", () => {
    it("invites a first habit when the pillar has none", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, daysShownUp: 0, hasHabits: false }))
            .toEqual({ hasScore: false, label: "Add a habit", detail: "No habits yet" });
    });

    it("holds back a score until a day has been counted", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, daysShownUp: 0, hasHabits: true }))
            .toEqual({ hasScore: false, label: "Just starting", detail: "Your first day counts once it's done" });
    });

    it("shows the percentage as soon as a habit has been completed", () => {
        expect(getPillarStatus({ percentage: 100, daysCounted: 1, daysShownUp: 1, hasHabits: true }))
            .toEqual({ hasScore: true, label: "100%", detail: "Showed up 1 of 1 day" });
    });

    it("holds back a 0% for the first couple of missed days", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 2, daysShownUp: 0, hasHabits: true }))
            .toEqual({ hasScore: false, label: "Just starting", detail: "Showed up 0 of 2 days so far" });
    });

    it("shows the percentage once there are enough days to count", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 3, daysShownUp: 0, hasHabits: true }))
            .toEqual({ hasScore: true, label: "0%", detail: "Showed up 0 of 3 days" });
    });
});

describe("capitalize", () => {
    it("upper-cases the first letter only", () => {
        expect(capitalize("spiritual")).toBe("Spiritual");
    });
});

describe("getWeekChange", () => {
    it("says nothing without a last week", () => {
        expect(getWeekChange(50, null)).toBeNull();
    });

    it("shows the direction and size of the change", () => {
        expect(getWeekChange(57, 43)).toBe("↑ 14 vs last week");
        expect(getWeekChange(20, 60)).toBe("↓ 40 vs last week");
        expect(getWeekChange(50, 50)).toBe("Same as last week");
    });
});
