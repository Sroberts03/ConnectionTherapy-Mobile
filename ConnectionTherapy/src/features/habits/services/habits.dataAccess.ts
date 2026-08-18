import { Habit, HabitCategory } from "../habits.types";
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

export async function createNewHabitDataAccess(
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    repetition: string,
    endDate: string,
    description: string,
    userId: string,
    db: SQLiteDatabase,
): Promise<number> {
    const result = await db.runAsync(`
            INSERT INTO habits (user_id, name, description, duration, category, frequency, start_date, end_date, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [userId, name, description, duration, category, repetition, startDate, endDate]);
    return result.lastInsertRowId;
}

export async function getHabitInstanceDataAccess(id: number, db: SQLiteDatabase): Promise<Habit> {
    const result = await db.getAllAsync<Habit>(`
            SELECT
                he.id,
                h.name,
                h.description,
                h.duration,
                h.category,
                he.is_completed as isCompleted
            FROM habit_entries he
            JOIN habits h on he.habit_id = h.id
            WHERE he.id = ?`, [id])
    return result[0];
}

export async function createHabitInstanceDataAccess(
    date: string,
    today: string,
    habitId: number,
    db: SQLiteDatabase
): Promise<Habit | null> {
    if (date === today ) {
        const id = await db.runAsync(`
            INSERT INTO habit_entries (habit_id, complete_by)
            VALUES (?, ?)
        `, [habitId, date]);
        return await getHabitInstanceDataAccess(id.lastInsertRowId, db)
    } else {
        await db.runAsync(`
            INSERT INTO habit_entries (habit_id, complete_by)
            VALUES (?, ?)
        `, [habitId, date]);
        return null;
    }
}