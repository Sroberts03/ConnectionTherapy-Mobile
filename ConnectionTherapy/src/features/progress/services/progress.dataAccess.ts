import { and, eq } from "drizzle-orm";
import { db } from "@src/db/index";
import { habit_entries, habits } from "@src/db/schema";
import { HabitSpan, PillarDay } from "../progress.types";

export async function getCompletedPillarDaysDataAccess(userId: string): Promise<PillarDay[]> {
    return db
        .selectDistinct({ date: habit_entries.complete_by, category: habits.category })
        .from(habit_entries)
        .innerJoin(habits, eq(habit_entries.habit_id, habits.id))
        .where(and(eq(habits.user_id, userId), eq(habit_entries.is_completed, true)));
}

export async function getActiveHabitSpansDataAccess(userId: string): Promise<HabitSpan[]> {
    return db
        .select({ category: habits.category, startDate: habits.start_date, endDate: habits.end_date })
        .from(habits)
        .where(and(eq(habits.user_id, userId), eq(habits.is_active, true)));
}
