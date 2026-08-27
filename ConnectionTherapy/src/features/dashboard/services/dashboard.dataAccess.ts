import { SQLiteDatabase } from "expo-sqlite";
import { Habit } from "../../habits/habits.types";

export async function getPillarHabitsDataAccess(
    pillarName: string,
    startOfWeek: string,
    today: string,
    db: SQLiteDatabase
): Promise<Habit[]> {
    const habits = await db.getAllAsync<Habit>(`
            SELECT
                he.id,
                h.name,
                h.description,
                h.duration,
                h.category,
                he.is_completed as isCompleted,
                he.completed_at as completedOn
            FROM habit_entries he
            JOIN habits h on he.habit_id = h.id
            WHERE he.complete_by BETWEEN ? AND ?
            and LOWER(h.category) = LOWER(?)`,
            [startOfWeek, today, pillarName]);    
    return habits;
}
