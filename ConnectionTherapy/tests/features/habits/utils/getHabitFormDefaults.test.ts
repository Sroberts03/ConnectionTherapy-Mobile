import { getHabitFormDefaults } from "../../../../src/features/habits/utils/getHabitFormDefaults";
import { HabitCategory } from "../../../../src/features/habits/habits.types";

describe("getHabitFormDefaults", () => {
    it("opens blank in the pillar it was added from", () => {
        expect(getHabitFormDefaults(HabitCategory.SOCIAL))
            .toEqual({ name: "", duration: "", category: HabitCategory.SOCIAL });
    });

    it("falls back to physical when no pillar is given", () => {
        expect(getHabitFormDefaults().category).toBe(HabitCategory.PHYSICAL);
    });

    it("pre-fills from a suggestion", () => {
        expect(getHabitFormDefaults(HabitCategory.PHYSICAL, { name: "Take a short walk", duration: "10 mins" }))
            .toEqual({ name: "Take a short walk", duration: "10 mins", category: HabitCategory.PHYSICAL });
    });
});
