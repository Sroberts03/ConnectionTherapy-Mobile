import { SQLiteDatabase } from "expo-sqlite";
import { JournalEntry } from "../journal.type";
import { getJournalEntriesDataAccess } from "./journal.dataAccess";

export async function getJournalEntries(userId: string, queryParam: string, db: SQLiteDatabase): Promise<Map<number, JournalEntry>> {
    const entries = new Map<number, JournalEntry>();
    const data = await getJournalEntriesDataAccess(userId, queryParam, db);
    data.forEach(entry => {
        entries.set(entry.id, entry);
    });
    return entries;
}