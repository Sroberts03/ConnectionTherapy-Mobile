import { HabitCategory } from "../habits/habits.types";

export interface ConnectionPillar {
    id: number;
    pillar: HabitCategory;
    percentage: number;
    color: string;
    icon: string;
    concern: boolean;
    danger: boolean;
}