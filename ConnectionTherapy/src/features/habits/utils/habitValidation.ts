import { HabitCategory } from "../habits.types";
import { CreationError } from "../errors/CreationError";

export default function creationValidation(
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    endDate: string,
) {
    if (name.trim() === "") {
        throw new CreationError("Habit name cannot be empty", "name");
    }
    if (!duration || duration.trim() === "") {
        throw new CreationError("Habit duration cannot be empty", "duration");
    }
    if (!startDate || startDate.trim() === "") {
        throw new CreationError("Habit start date cannot be empty", "startDate");
    }
    if (!category) {
        throw new CreationError("Habit category cannot be empty", "category");
    }
    if (endDate && endDate < startDate) {
        throw new CreationError("Habit end date cannot be before start date", "endDate");
    }
}