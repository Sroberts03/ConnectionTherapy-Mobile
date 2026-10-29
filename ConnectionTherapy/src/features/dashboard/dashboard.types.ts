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
    // Last week's score for the same pillar, or null if there's no last week to compare with
    lastWeekPercentage: number | null;
}

export interface PillarHabit extends Habit {
    completeBy: string;
}
