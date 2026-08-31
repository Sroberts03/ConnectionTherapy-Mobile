import { HabitCategory } from "./habits.types";

export interface newHabitInput {
    userCurrentDate: string,
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    repetition: string,
    endDate: string | null,
    description: string | null,
    userId: string,
    habitInstanceId?: number
}