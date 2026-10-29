import { capitalize, getPillarStatus } from "../../../../src/features/dashboard/utils/getPillarStatus";

describe("getPillarStatus", () => {
    it("invites a first habit when the pillar has none", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, daysShownUp: 0, hasHabits: false }))
            .toEqual({ hasScore: false, label: "Add a habit", detail: "No habits yet" });
    });

    it("holds back a score until a day has been counted", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, daysShownUp: 0, hasHabits: true }))
            .toEqual({ hasScore: false, label: "Just starting", detail: "Your first day counts once it's done" });
    });

    it("shows the percentage once there's a day to count", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 2, daysShownUp: 0, hasHabits: true }))
            .toEqual({ hasScore: true, label: "0%", detail: "Showed up 0 of 2 days" });
    });

    it("uses the singular for a single counted day", () => {
        expect(getPillarStatus({ percentage: 100, daysCounted: 1, daysShownUp: 1, hasHabits: true }).detail)
            .toBe("Showed up 1 of 1 day");
    });
});

describe("capitalize", () => {
    it("upper-cases the first letter only", () => {
        expect(capitalize("spiritual")).toBe("Spiritual");
    });
});
