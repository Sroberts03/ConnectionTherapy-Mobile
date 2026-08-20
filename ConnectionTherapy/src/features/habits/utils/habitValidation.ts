import { HabitCategory } from "../habits.types";
import { CreationError } from "../errors/CreationError";

function isBlank(value?: string): boolean {
    return !value || value.trim() === "";
}

function isEndDateBeforeStart(startDate: string, endDate: string): boolean {
    return Boolean(endDate) && endDate < startDate;
}

type ValidationField = "name" | "duration" | "startDate" | "category" | "endDate";

export default function creationValidation(
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    endDate: string,
) {
    const rules: { field: ValidationField; invalid: boolean; message: string }[] = [
        { field: "name", invalid: isBlank(name), message: "Habit name cannot be empty" },
        { field: "duration", invalid: isBlank(duration), message: "Habit duration cannot be empty" },
        { field: "startDate", invalid: isBlank(startDate), message: "Habit start date cannot be empty" },
        { field: "category", invalid: !category, message: "Habit category cannot be empty" },
        { field: "endDate", invalid: isEndDateBeforeStart(startDate, endDate), message: "Habit end date cannot be before start date" },
    ];

    const failure = rules.find(rule => rule.invalid);
    if (failure) {
        throw new CreationError(failure.message, failure.field);
    }
}