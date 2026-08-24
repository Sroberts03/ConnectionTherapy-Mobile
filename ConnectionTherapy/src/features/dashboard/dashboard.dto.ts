import { HabitCategory } from "@features/habits/habits.types";
import { ConnectionPillar } from "./dashboard.types";

export interface GetPillarsRes {
    pillars: {
        id: number;
        name: HabitCategory;
        light_color: string;
        dark_color: string;
        icon: string;
    }[]
}
