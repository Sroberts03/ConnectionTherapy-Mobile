import { JournalEntry } from "../journal.type";
import { createJournalEntryDataAccess, deleteJournalEntryDataAccess, getJournalEntriesDataAccess, updateJournalEntryDataAccess } from "./journal.dataAccess";
import { NewJournalEntryDTO } from "../journal.dto";

export async function getJournalEntries(userId: string, queryParam: string): Promise<Map<number, JournalEntry>> {
    const entries = new Map<number, JournalEntry>();
    const data = await getJournalEntriesDataAccess(userId, queryParam);
    data.forEach(entry => {
        entries.set(entry.id, entry);
    });
    return entries;
}

export async function saveJournalEntryService(entry: NewJournalEntryDTO, userId: string): Promise<JournalEntry> {
    let savedEntry: JournalEntry;
    if (entry.id) {
        savedEntry = await updateJournalEntryDataAccess(entry, userId);
    } else {
        savedEntry = await createJournalEntryDataAccess(entry, userId);
    }
    return savedEntry;
}

export async function deleteJournalEntryService(entryId: number, userId: string): Promise<void> {
    await deleteJournalEntryDataAccess(entryId, userId);
}
