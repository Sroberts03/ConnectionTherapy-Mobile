import { formatDate } from "../../../utils/dates";
import { JournalEntry } from "../journal.type";

export function getJournalEntryById(journalEntries: Map<number, JournalEntry>, id?: number): JournalEntry | undefined {
    if (id) {
        return journalEntries.get(id);
    }
    return undefined;
}

export function getJournalTitleTextAndDate(journalEntry: JournalEntry | undefined): { title: string; text: string; date: string } {
    if (journalEntry) {
        return { title: journalEntry.title, text: journalEntry.text, date: formatDate(new Date(`${journalEntry.date}T00:00:00`)) };
    }
    return { title: "", text: "", date: formatDate(new Date()) };
};