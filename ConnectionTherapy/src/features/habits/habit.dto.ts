import { SQLiteDatabase } from "expo-sqlite";
import { HabitCategory } from "./habits.types";

export interface newHabitInput {
    userCurrentDate: string,
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    repetition: string,
    endDate: string,
    description: string,
    userId: string,
    db: SQLiteDatabase,
    habitInstanceId?: number
}