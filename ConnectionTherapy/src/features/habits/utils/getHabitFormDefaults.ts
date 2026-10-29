import { HabitCategory } from "../habits.types";
import { HabitSuggestion } from "./habitSuggestions";

// What a fresh new-habit form opens with: blank, or pre-filled from a tapped suggestion
export function getHabitFormDefaults(category?: HabitCategory, suggestion?: HabitSuggestion) {
    return {
        name: suggestion?.name ?? "",
        duration: suggestion?.duration ?? "",
        category: category ?? HabitCategory.PHYSICAL,
    };
}
