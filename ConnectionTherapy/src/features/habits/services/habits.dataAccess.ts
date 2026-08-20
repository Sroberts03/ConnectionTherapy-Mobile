import { Habit, HabitCategory, HabitDetails } from "../habits.types";
import { SQLiteDatabase } from "expo-sqlite";
import { getToday } from "../../../utils/dates";

export async function getHabitsDataAccess(
    formattedDate: string,
    userId: string,
    db: SQLiteDatabase,
    maxHabits: number | "all"
): Promise<Habit[]> {
    const query = `
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
            WHERE he.complete_by = ?
            and h.user_id = ?
            ${maxHabits !== "all" ? "LIMIT ?" : ""}`
            
    const queryParams = maxHabits !== "all" 
        ? [formattedDate, userId, maxHabits] 
        : [formattedDate, userId];

    const habits = await db.getAllAsync<Habit>(query, queryParams);
    return habits;
}

export async function markHabitCompleteDataAccess(
    habitId: number,
    date: string,
    db: SQLiteDatabase
) {
    await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 1, completed_at = ?, updated_at = ?
            WHERE id = ?
    `, [date, date, habitId]);
}

export async function markHabitIncompleteDataAccess(
    habitId: number,
    date: string,
    db: SQLiteDatabase
) {
    await db.runAsync(`
            UPDATE habit_entries
            SET is_completed = 0, completed_at = null, updated_at = ?
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

async function getHabitInstanceDataAccess(id: number, db: SQLiteDatabase): Promise<Habit> {
    const result = await db.getAllAsync<Habit>(`
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
            WHERE he.id = ?`, [id])
    return result[0];
}

export async function getHabitDetailsDataAccess(
    habitId: number,
    db: SQLiteDatabase
): Promise<HabitDetails> {
    const result = await db.getAllAsync<HabitDetails>(`
            SELECT
                he.id,
                h.name,
                h.description,
                h.duration,
                h.category,
                h.frequency as repetition,
                h.start_date as startDate,
                h.end_date as endDate,
                he.is_completed as isCompleted
            FROM habit_entries he
            JOIN habits h on he.habit_id = h.id
            WHERE he.id = ?`, [habitId])
    return result[0];
}

export async function createHabitInstanceDataAccess(
    date: string,
    habitId: number,
    db: SQLiteDatabase
): Promise<Habit> {
    const id = await db.runAsync(`
        INSERT INTO habit_entries (habit_id, complete_by)
        VALUES (?, ?)
    `, [habitId, date]);
    return await getHabitInstanceDataAccess(id.lastInsertRowId, db)
}

export async function userOwnsHabitDataAccess(
    habitInstanceId: number,
    userId: string,
    db: SQLiteDatabase
): Promise<boolean> {
    try {
        const result = await db.getAllAsync<number>(`
                SELECT
                    he.id
                FROM habit_entries he
                JOIN habits h on he.habit_id = h.id
                WHERE he.id = ? and h.user_id = ?`, 
                [habitInstanceId, userId])
        return result.length > 0;
    } catch {
        return false
    }
}

export async function updateHabitDataAccess(
    habitId: number,
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    repetition: string,
    endDate: string,
    description: string,
    userId: string,
    db: SQLiteDatabase,
): Promise<void> {
    await db.runAsync(`
            UPDATE habits
            SET 
                name = ?, 
                description = ?, 
                duration = ?, 
                category = ?, 
                frequency = ?, 
                start_date = ?, 
                end_date = ?, 
                updated_at = ?
            WHERE id = ?
    `, [name, description, duration, category, repetition, startDate, endDate, getToday(), habitId]);
}

export async function getHabitIdFromInstanceIdDataAccess(habitInstanceId: number, db: SQLiteDatabase): Promise<number> {
    const result = await db.getAllAsync<{habitId: number}>(`
            SELECT
                habit_id as habitId
            FROM habit_entries
            WHERE id = ?`, [habitInstanceId])
    return result[0].habitId;
}

export async function deleteHabitInstancesDataAccess(habitId: number, today: string, db: SQLiteDatabase) {
    await db.runAsync(`
            DELETE FROM habit_entries
            WHERE habit_id = ? AND complete_by >= ?
    `, [habitId, today]);
}

export async function deleteHabitInstanceDataAccess(habitInstanceId: number, db: SQLiteDatabase) {
    await db.runAsync(`
        DELETE FROM habit_entries
        WHERE id = ?
    `, [habitInstanceId])
}

async function markHabitInactiveDataAccess(habitId: number, db: SQLiteDatabase) {
    await db.runAsync(`
        UPDATE habits
        SET is_active = 0
        WHERE id = ?
    `, [habitId])
}
    