import { getCountFrom, getLastWeekPercent, getPillarPercent } from "../../../../src/features/dashboard/utils/getPillarPercent";
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

const SUNDAY = "2026-10-25";

describe("getPillarPercent", () => {
    it("returns 0 with nothing evaluated when there are no habits", () => {
        expect(getPillarPercent([], TODAY, TODAY)).toEqual({ percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits: false });
    });

    it("doesn't count today against the user before it's done", () => {
        expect(getPillarPercent([entry(TODAY, false)], TODAY, TODAY)).toEqual({ percentage: 0, evaluatedDays: 0, daysCounted: 0, daysShownUp: 0, hasHabits: true });
    });

    it("gives full credit to a user who started today and showed up", () => {
        expect(getPillarPercent([entry(TODAY, true)], TODAY, TODAY)).toEqual({ percentage: 100, evaluatedDays: 0, daysCounted: 1, daysShownUp: 1, hasHabits: true });
    });

    it("counts every day of the week, not just days a habit was due", () => {
        // Sunday to Wednesday have passed and only today was done: 1 of 5 days
        expect(getPillarPercent([entry(TODAY, true)], TODAY, SUNDAY)).toEqual({ percentage: 20, evaluatedDays: 4, daysCounted: 5, daysShownUp: 1, hasHabits: true });
    });

    it("counts a day once even with several habits done", () => {
        const habits = [entry("2026-10-28", true), entry("2026-10-28", true), entry(TODAY, true)];
        expect(getPillarPercent(habits, TODAY, "2026-10-28")).toEqual({ percentage: 100, evaluatedDays: 1, daysCounted: 2, daysShownUp: 2, hasHabits: true });
    });

    it("ignores completions from before the window opens", () => {
        const habits = [entry("2026-10-26", true), entry("2026-10-28", false)];
        expect(getPillarPercent(habits, TODAY, "2026-10-28")).toEqual({ percentage: 0, evaluatedDays: 1, daysCounted: 1, daysShownUp: 0, hasHabits: true });
    });
});

describe("getCountFrom", () => {
    it("starts at Sunday for a user who began before this week", () => {
        expect(getCountFrom(SUNDAY, "2026-09-01")).toBe(SUNDAY);
    });

    it("starts at the first habit for a user who began this week", () => {
        expect(getCountFrom(SUNDAY, TODAY)).toBe(TODAY);
    });

    it("starts at Sunday before any habit exists", () => {
        expect(getCountFrom(SUNDAY, null)).toBe(SUNDAY);
    });
});

describe("getLastWeekPercent", () => {
    const LAST_SUNDAY = "2026-10-18";

    it("is null when the pillar had nothing last week", () => {
        expect(getLastWeekPercent([], LAST_SUNDAY, SUNDAY, null)).toBeNull();
    });

    it("judges all seven days, Saturday included", () => {
        const habits = [entry("2026-10-18", true), entry("2026-10-24", false)];
        expect(getLastWeekPercent(habits, LAST_SUNDAY, SUNDAY, null)).toBe(14);
    });

    it("counts a done Saturday", () => {
        const habits = [entry("2026-10-24", true)];
        expect(getLastWeekPercent(habits, LAST_SUNDAY, SUNDAY, null)).toBe(14);
    });

    it("starts from the first habit if that was midweek", () => {
        const habits = [entry("2026-10-23", true), entry("2026-10-24", true)];
        expect(getLastWeekPercent(habits, LAST_SUNDAY, SUNDAY, "2026-10-23")).toBe(100);
    });

    it("is null when the user only started this week", () => {
        expect(getLastWeekPercent([entry("2026-10-20", true)], LAST_SUNDAY, SUNDAY, TODAY)).toBeNull();
    });
});
