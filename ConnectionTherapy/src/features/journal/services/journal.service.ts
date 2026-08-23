import { SQLiteDatabase } from "expo-sqlite";
import { JournalEntry } from "../journal.type";
import { createJournalEntryDataAccess, getJournalEntriesDataAccess, updateJournalEntryDataAccess } from "./journal.dataAccess";
import { NewJournalEntryDTO } from "../journal.dto";

export async function getJournalEntries(userId: string, queryParam: string, db: SQLiteDatabase): Promise<Map<number, JournalEntry>> {
    const entries = new Map<number, JournalEntry>();
    const data = await getJournalEntriesDataAccess(userId, queryParam, db);
    data.forEach(entry => {
        entries.set(entry.id, entry);
    });
    return entries;
}

export async function saveJournalEntryService(entry: NewJournalEntryDTO, userId: string, db: SQLiteDatabase): Promise<JournalEntry> {
    let savedEntry: JournalEntry;
    if (entry.id) {
        savedEntry = await updateJournalEntryDataAccess(entry, userId, db);
    } else {
        savedEntry = await createJournalEntryDataAccess(entry, userId, db);
    }
    return savedEntry;
}