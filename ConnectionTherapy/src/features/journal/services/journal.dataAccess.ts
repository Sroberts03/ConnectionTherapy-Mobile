import { JournalEntry } from "../journal.type";
import { NewJournalEntryDTO } from "../journal.dto";
import { eq, and, like, desc, sql } from "drizzle-orm";
import { journal_entries } from "@src/db/schema";
import { db } from "@src/db/index";

export async function getJournalEntriesDataAccess(
    userId: string, 
    queryParam: string
): Promise<JournalEntry[]> {
    const result = await db
        .select({
            id: journal_entries.id,
            title: journal_entries.title,
            text: journal_entries.text,
            date: journal_entries.date
        })
        .from(journal_entries)
        .where(
            and(
                eq(journal_entries.user_id, userId),
                like(journal_entries.title, `%${queryParam}%`)
            )
        )
        .orderBy(desc(journal_entries.created_at));

    return result;
}

export async function createJournalEntryDataAccess(
    entry: NewJournalEntryDTO, 
    userId: string
): Promise<JournalEntry> {
    const result = await db.insert(journal_entries)
        .values({
            user_id: userId,
            title: entry.title,
            text: entry.text,
            date: entry.date
        })
        .returning({
            id: journal_entries.id,
            title: journal_entries.title,
            text: journal_entries.text,
            date: journal_entries.date
        });

    return result[0]!;
}

export async function updateJournalEntryDataAccess(
    entry: NewJournalEntryDTO, 
    userId: string
): Promise<JournalEntry> {
    if (!entry.id) {
        throw new Error("Entry ID is required for updating a journal entry.");
    }

    const result = await db.update(journal_entries)
        .set({
            title: entry.title,
            text: entry.text,
            date: entry.date,
            updated_at: sql`CURRENT_TIMESTAMP`
        })
        .where(
            and(
                eq(journal_entries.id, entry.id),
                eq(journal_entries.user_id, userId)
            )
        )
        .returning({
            id: journal_entries.id,
            title: journal_entries.title,
            text: journal_entries.text,
            date: journal_entries.date
        });

    return result[0]!;
}

export async function deleteJournalEntryDataAccess(
    entryId: number, 
    userId: string
): Promise<void> {
    await db.delete(journal_entries)
        .where(
            and(
                eq(journal_entries.id, entryId),
                eq(journal_entries.user_id, userId)
            )
        );
}