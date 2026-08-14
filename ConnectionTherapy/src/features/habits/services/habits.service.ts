import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "../habits.types";

export async function getHabits(date: Date, db: SQLiteDatabase): Promise<Habit[]> {
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
            he.is_completed
        FROM habit_entries he
        JOIN habits h on he.habit_id = h.id
        WHERE he.complete_by = ?`,
        [formattedDate]);
    return habits;
}