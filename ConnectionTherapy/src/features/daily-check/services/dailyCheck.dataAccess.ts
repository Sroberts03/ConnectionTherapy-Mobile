import { and, eq, gte, lte } from "drizzle-orm";
import { daily_checks } from "@src/db/schema";
import { db } from "@src/db/index";

const columns = {
    id: daily_checks.id,
    date: daily_checks.date,
    mood: daily_checks.mood_rating,
    notes: daily_checks.notes,
};

export type DailyCheckRow = { id: number; date: string; mood: string; notes: string | null };

export async function getDailyChecksInRangeDataAccess(userId: string, from: string, to: string): Promise<DailyCheckRow[]> {
    return db.select(columns)
        .from(daily_checks)
        .where(and(
            eq(daily_checks.user_id, userId),
            gte(daily_checks.date, from),
            lte(daily_checks.date, to)
        ))
        .orderBy(daily_checks.date);
}

export async function createDailyCheckDataAccess(userId: string, date: string, mood: string, notes: string | null): Promise<DailyCheckRow> {
    const [row] = await db.insert(daily_checks)
        .values({ user_id: userId, date, mood_rating: mood, notes })
        .returning(columns);
    return row!;
}

export async function updateDailyCheckDataAccess(id: number, userId: string, mood: string, notes: string | null): Promise<DailyCheckRow> {
    const [row] = await db.update(daily_checks)
        .set({ mood_rating: mood, notes })
        .where(and(eq(daily_checks.id, id), eq(daily_checks.user_id, userId)))
        .returning(columns);
    return row!;
}
