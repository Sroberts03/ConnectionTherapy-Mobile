import { Habit, HabitCategory } from "../habits/habits.types";

export interface ConnectionPillar {
    id: number;
    name: HabitCategory;
    percentage: number;
    lightColor: string;
    darkColor: string;
    icon: string;
    concern: boolean;
    danger: boolean;
    daysCounted: number;
    daysShownUp: number;
    hasHabits: boolean;
}

export interface PillarHabit extends Habit {
    completeBy: string;
}
