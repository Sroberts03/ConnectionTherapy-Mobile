// An empty or whitespace-only note is no note
export function normaliseNotes(notes: string): string | null {
    const trimmed = notes.trim();
    return trimmed === "" ? null : trimmed;
}
