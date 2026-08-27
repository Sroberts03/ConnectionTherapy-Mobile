import { SQLiteDatabase } from "expo-sqlite";
import { JournalEntry } from "../journal.type";
import { NewJournalEntryDTO } from "../journal.dto";

export async function getJournalEntriesDataAccess(userId: string, queryParam: string, db: SQLiteDatabase): Promise<JournalEntry[]> {
    const result = await db.getAllAsync(`
        SELECT 
            id, title, text, date
        FROM journal_entries
        WHERE user_id = ? AND title LIKE ?
        ORDER BY created_at DESC;`, [userId, `%${queryParam}%`]); 
    return result as JournalEntry[];
}

export async function createJournalEntryDataAccess(entry: NewJournalEntryDTO, userId: string, db: SQLiteDatabase): Promise<JournalEntry> {
    await db.runAsync(`
        INSERT INTO journal_entries (user_id, title, text, date)
        VALUES (?, ?, ?, ?)
        RETURNING id, title, text, date;`, [userId, entry.title, entry.text, entry.date]);
    const newEntry = await getLatestJournalEntryDataAccess(userId, db);
    return newEntry;
}

export async function updateJournalEntryDataAccess(entry: NewJournalEntryDTO, userId: string, db: SQLiteDatabase): Promise<JournalEntry> {
    if (!entry.id) {
        throw new Error("Entry ID is required for updating a journal entry.");
    }
    await db.runAsync(`
        UPDATE journal_entries
        SET title = ?, text = ?, date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
        `, [entry.title, entry.text, entry.date, entry.id, userId]);
    return await getJournalEntryByIdDataAccess(entry.id!, userId, db);
}

async function getJournalEntryByIdDataAccess(entryId: number, userId: string, db: SQLiteDatabase): Promise<JournalEntry> {
    const result = await db.getAllAsync(`
        SELECT id, title, text, date
        FROM journal_entries
        WHERE id = ? AND user_id = ?;`, [entryId, userId]);
    return result[0] as JournalEntry;
}

async function getLatestJournalEntryDataAccess(userId: string, db: SQLiteDatabase): Promise<JournalEntry> {
    const result = await db.getAllAsync(`
        SELECT id, title, text, date
        FROM journal_entries
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1;`, [userId]);
    return result[0] as JournalEntry;
}

export async function deleteJournalEntryDataAccess(entryId: number, userId: string, db: SQLiteDatabase): Promise<void> {
    await db.runAsync(`
        DELETE FROM journal_entries
        WHERE id = ? AND user_id = ?;`, [entryId, userId]);
}