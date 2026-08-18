import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "../habits.types";

export async function getHabits(date: Date, userId: string, db: SQLiteDatabase): Promise<Habit[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
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

export async function toggleComplete(habitId: number, isComplete: boolean, db: SQLiteDatabase): Promise<void> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (isComplete) {
        await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 1, updated_at = ?
            WHERE id = ?
        `, [formattedDate, habitId]);
    } else {
        await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 0, updated_at = ? 
            WHERE id = ? 
        `, [formattedDate, habitId]);
    }
}