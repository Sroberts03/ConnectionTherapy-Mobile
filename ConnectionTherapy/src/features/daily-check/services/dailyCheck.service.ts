import { DailyCheck, DailyCheckInput } from "../dailyCheck.types";
import { isMoodKey } from "../utils/moods";
import {
    createDailyCheckDataAccess,
    DailyCheckRow,
    getDailyChecksInRangeDataAccess,
    updateDailyCheckDataAccess,
} from "./dailyCheck.dataAccess";

function toDailyCheck(row: DailyCheckRow): DailyCheck | null {
    return isMoodKey(row.mood) ? { ...row, mood: row.mood } : null;
}

export async function getDailyChecks(userId: string, from: string, to: string): Promise<DailyCheck[]> {
    const rows = await getDailyChecksInRangeDataAccess(userId, from, to);
    return rows.map(toDailyCheck).filter((check): check is DailyCheck => check !== null);
}

// One check-in per day: checking in again the same day updates it
export async function saveDailyCheck(userId: string, input: DailyCheckInput): Promise<DailyCheck> {
    const [existing] = await getDailyChecksInRangeDataAccess(userId, input.date, input.date);
    const row = existing
        ? await updateDailyCheckDataAccess(existing.id, userId, input.mood, input.notes)
        : await createDailyCheckDataAccess(userId, input.date, input.mood, input.notes);
    return { ...row, mood: input.mood };
}
