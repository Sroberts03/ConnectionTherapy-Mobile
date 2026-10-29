import { getPillarStatus } from "../../../../src/features/dashboard/utils/getPillarStatus";

describe("getPillarStatus", () => {
    it("invites a first habit when the pillar has none", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, hasHabits: false })).toEqual({ hasScore: false, label: "Add a habit" });
    });

    it("holds back a score until a day has been counted", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 0, hasHabits: true })).toEqual({ hasScore: false, label: "Just starting" });
    });

    it("shows the percentage once there's a day to count", () => {
        expect(getPillarStatus({ percentage: 0, daysCounted: 2, hasHabits: true })).toEqual({ hasScore: true, label: "0%" });
    });
});
