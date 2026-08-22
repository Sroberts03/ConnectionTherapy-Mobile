import { SQLiteDatabase } from "expo-sqlite";
import { JournalEntry } from "../journal.type";

export async function getJournalEntriesDataAccess(userId: string, queryParam: string, db: SQLiteDatabase): Promise<JournalEntry[]> {
    const result = await db.getAllAsync(`
        SELECT 
            id, title, text, date
        FROM journal_entries
        WHERE user_id = ? AND title LIKE ?;`, [userId, `%${queryParam}%`]); 
    return result as JournalEntry[];
}