import { getPillarPercent } from "../../../../src/features/dashboard/utils/getPillarPercent";
import { PillarHabit } from "../../../../src/features/dashboard/dashboard.types";
import { HabitCategory } from "../../../../src/features/habits/habits.types";

const TODAY = "2026-10-29";

function entry(completeBy: string, isCompleted: boolean): PillarHabit {
    return {
        id: 1,
        name: "Meditate",
        description: null,
        duration: "10 mins",
        category: HabitCategory.SPIRITUAL,
        isCompleted,
        completedOn: isCompleted ? completeBy : null,
        completeBy
    };
}

describe("getPillarPercent", () => {
    it("returns 0 with nothing evaluated when there are no habits", () => {
        expect(getPillarPercent([], TODAY)).toEqual({ percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits: false });
    });

    it("doesn't count today against the user before it's done", () => {
        expect(getPillarPercent([entry(TODAY, false)], TODAY)).toEqual({ percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits: true });
    });

    it("gives full credit for a habit started and completed today", () => {
        expect(getPillarPercent([entry(TODAY, true)], TODAY)).toEqual({ percentage: 100, evaluatedDays: 0, daysCounted: 1, daysShownUp: 1, hasHabits: true });
    });

    it("only counts days a habit was scheduled", () => {
        const habits = [entry("2026-10-27", true), entry("2026-10-28", false), entry(TODAY, false)];
        expect(getPillarPercent(habits, TODAY)).toEqual({ percentage: 50, evaluatedDays: 2, daysCounted: 2, daysShownUp: 1, hasHabits: true });
    });

    it("counts a day once even with several habits due", () => {
        const habits = [entry("2026-10-28", true), entry("2026-10-28", false), entry(TODAY, true)];
        expect(getPillarPercent(habits, TODAY)).toEqual({ percentage: 100, evaluatedDays: 1, daysCounted: 2, daysShownUp: 2, hasHabits: true });
    });
});
