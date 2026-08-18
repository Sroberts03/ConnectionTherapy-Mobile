import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "../habits.types";
import { getHabitsDataAccess, markHabitCompleteDataAccess, markHabitIncompleteDataAccess } from "./habits.dataAccess";

export async function getHabits(
    date: Date,
    userId: string,
    db: SQLiteDatabase
): Promise<Habit[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const habits: Habit[] = await getHabitsDataAccess(formattedDate, userId, db);
    return habits;
}

export async function toggleComplete(
    habitId: number,
    isComplete: boolean,
    db: SQLiteDatabase
): Promise<void> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (isComplete) {
        await markHabitCompleteDataAccess(habitId, formattedDate, db);
    } else {
        await markHabitIncompleteDataAccess(habitId, formattedDate, db);
    }
}