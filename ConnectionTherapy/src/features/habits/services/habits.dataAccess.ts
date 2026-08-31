import { Habit, HabitCategory, HabitDetails } from "../habits.types";
import { getToday } from "../../../utils/dates";
import { eq, and, gte } from "drizzle-orm";
import { habits, habit_entries } from "../../../db/schema";
import { db } from "../../../db/index";

export async function getHabitsDataAccess(
    formattedDate: string,
    userId: string,
    maxHabits: number | "all"
): Promise<Habit[]> {
    const query = db
        .select({
            id: habit_entries.id,
            name: habits.name,
            description: habits.description,
            duration: habits.duration,
            category: habits.category,
            isCompleted: habit_entries.is_completed,
            completedOn: habit_entries.completed_at
        })
        .from(habit_entries)
        .innerJoin(habits, eq(habit_entries.habit_id, habits.id))
        .where(
            and(
                eq(habit_entries.complete_by, formattedDate),
                eq(habits.user_id, userId)
            )
        );
        
    if (maxHabits !== "all") {
        query.limit(maxHabits);
    }

    return await query;
}

export async function markHabitCompleteDataAccess(
    habitId: number,
    date: string,
) {
    await db.update(habit_entries)
        .set({ is_completed: true, completed_at: date, updated_at: date })
        .where(eq(habit_entries.id, habitId));
}

export async function markHabitIncompleteDataAccess(
    habitId: number,
    date: string,
) {
    await db.update(habit_entries)
        .set({ is_completed: false, completed_at: null, updated_at: date })
        .where(eq(habit_entries.id, habitId));
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
): Promise<number> {
    const result = await db.insert(habits).values({
        user_id: userId,
        name,
        description,
        duration,
        category,
        frequency: repetition,
        start_date: startDate,
        end_date: endDate,
        is_active: true
    }).returning({ insertedId: habits.id });

    if (result.length === 0 || !result[0]) {
        throw new Error("Failed to create new habit");
    }
    
    return result[0].insertedId;
}

async function getHabitInstanceDataAccess(id: number): Promise<Habit> {
    const result = await db.select({
            id: habit_entries.id,
            name: habits.name,
            description: habits.description,
            duration: habits.duration,
            category: habits.category,
            isCompleted: habit_entries.is_completed,
            completedOn: habit_entries.completed_at
        })
        .from(habit_entries)
        .innerJoin(habits, eq(habit_entries.habit_id, habits.id))
        .where(eq(habit_entries.id, id));
        
    return result[0]!;
}

export async function getHabitDetailsDataAccess(
    habitId: number,
): Promise<HabitDetails> {
    const result = await db.select({
            id: habit_entries.id,
            name: habits.name,
            description: habits.description,
            duration: habits.duration,
            category: habits.category,
            repetition: habits.frequency,
            startDate: habits.start_date,
            endDate: habits.end_date,
            isCompleted: habit_entries.is_completed
        })
        .from(habit_entries)
        .innerJoin(habits, eq(habit_entries.habit_id, habits.id))
        .where(eq(habit_entries.id, habitId));
        
    return result[0]!;
}

export async function createHabitInstanceDataAccess(
    date: string,
    habitId: number,
): Promise<Habit> {
    const result = await db.insert(habit_entries).values({
        habit_id: habitId,
        complete_by: date
    }).returning({ insertedId: habit_entries.id });
    
    if (result.length === 0 || !result[0]) {
        throw new Error("Failed to create habit instance");
    }

    return await getHabitInstanceDataAccess(result[0].insertedId);
}

export async function userOwnsHabitDataAccess(
    habitInstanceId: number,
    userId: string,
): Promise<boolean> {
    try {
        const result = await db.select({ id: habit_entries.id })
            .from(habit_entries)
            .innerJoin(habits, eq(habit_entries.habit_id, habits.id))
            .where(
                and(
                    eq(habit_entries.id, habitInstanceId),
                    eq(habits.user_id, userId)
                )
            );
            
        return result.length > 0;
    } catch {
        return false;
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
): Promise<void> {
    await db.update(habits).set({
        name,
        description,
        duration,
        category,
        frequency: repetition,
        start_date: startDate,
        end_date: endDate,
        updated_at: getToday()
    }).where(eq(habits.id, habitId));
}

export async function getHabitIdFromInstanceIdDataAccess(habitInstanceId: number): Promise<number> {
    const result = await db.select({ habitId: habit_entries.habit_id })
        .from(habit_entries)
        .where(eq(habit_entries.id, habitInstanceId));
        
    return result[0]?.habitId!;
}

export async function deleteHabitInstancesDataAccess(habitId: number, today: string) {
    await db.delete(habit_entries)
        .where(
            and(
                eq(habit_entries.habit_id, habitId),
                gte(habit_entries.complete_by, today)
            )
        );
}

export async function deleteHabitInstanceDataAccess(habitInstanceId: number) {
    await db.delete(habit_entries)
        .where(eq(habit_entries.id, habitInstanceId));
}

export async function markHabitInactiveDataAccess(habitId: number) {
    await db.update(habits)
        .set({ is_active: false, updated_at: getToday() })
        .where(eq(habits.id, habitId));
}