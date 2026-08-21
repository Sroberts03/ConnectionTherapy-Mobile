import { HabitCategory } from "../../../../src/features/habits/habits.types";
import creationValidation from "../../../../src/features/habits/utils/habitValidation";

describe("creationValidation", () => {
    it("should throw an error if the habit name is empty", () => {
        expect(() => creationValidation("", "1 week", HabitCategory.SOCIAL, "2023-01-01", "2023-01-07")).toThrow("Habit name cannot be empty");
    });

    it("should throw an error if the habit duration is empty", () => {
        expect(() => creationValidation("Exercise", "", HabitCategory.SOCIAL, "2023-01-01", "2023-01-07")).toThrow("Habit duration cannot be empty");
    });

    it("should throw an error if the habit category is empty", () => {
        expect(() => creationValidation("Exercise", "1 week", null as any, "2023-01-01", "2023-01-07")).toThrow("Habit category cannot be empty");
    });

    it("should throw an error if the habit start date is empty", () => {
        expect(() => creationValidation("Exercise", "1 week", HabitCategory.SOCIAL, "", "2023-01-07")).toThrow("Habit start date cannot be empty");
    });

    it("should throw an error if the habit end date is before the start date", () => {
        expect(() => creationValidation("Exercise", "1 week", HabitCategory.SOCIAL, "2023-01-07", "2023-01-01")).toThrow("Habit end date cannot be before start date");
    });

    it("should not throw an error for valid input", () => {
        expect(() => creationValidation("Exercise", "1 week", HabitCategory.SOCIAL, "2023-01-01", "2023-01-07")).not.toThrow();
    });
});