import { Habit } from "../../habits/habits.types";
import { db } from "@src/db/index";
import { eq, and, between, sql } from "drizzle-orm";
import { habits, habit_entries } from "@src/db/schema";

export async function getPillarHabitsDataAccess(
    pillarName: string,
    startOfWeek: string,
    today: string,
): Promise<Habit[]> {
    const fetchedHabits = await db
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
            between(habit_entries.complete_by, startOfWeek, today),
            sql`LOWER(${habits.category}) = LOWER(${pillarName})`
        )
    );
    return fetchedHabits;
}
