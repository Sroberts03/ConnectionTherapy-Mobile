import { Habit } from "../habits.types";
import { SQLiteDatabase } from "expo-sqlite";

export async function getHabitsDataAccess(
    formattedDate: string,
    userId: string,
    db: SQLiteDatabase
): Promise<Habit[]> {
    const habits = await db.getAllAsync<Habit>(`
            SELECT
                he.id,
                h.name,
                h.description,
                h.duration,
                h.category,
                he.is_completed as isCompleted
            FROM habit_entries he
            JOIN habits h on he.habit_id = h.id
            WHERE he.complete_by = ?
            and h.user_id = ?`,
            [formattedDate, userId]);
    return habits;
}

export async function markHabitCompleteDataAccess(
    habitId: number,
    date: string,
    db: SQLiteDatabase
) {
    await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 1, updated_at = ?
            WHERE id = ?
    `, [date, habitId]);
}

export async function markHabitIncompleteDataAccess(
    habitId: number,
    date: string,
    db: SQLiteDatabase
) {
    await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 0, updated_at = ?
            WHERE id = ?
    `, [date, habitId]);
}