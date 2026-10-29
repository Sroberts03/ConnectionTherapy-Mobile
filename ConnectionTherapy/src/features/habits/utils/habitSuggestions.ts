import { HabitCategory } from "../habits.types";

export interface HabitSuggestion {
    name: string;
    duration: string;
}

// One small, concrete starting point per pillar, so an empty pillar offers a first step instead of a blank
export const habitSuggestions: Record<HabitCategory, HabitSuggestion> = {
    [HabitCategory.SPIRITUAL]: { name: "Sit quietly", duration: "5 mins" },
    [HabitCategory.PHYSICAL]: { name: "Take a short walk", duration: "10 mins" },
    [HabitCategory.SOCIAL]: { name: "Message a friend", duration: "5 mins" },
    [HabitCategory.INTELLECTUAL]: { name: "Read a few pages", duration: "10 pages" },
};
