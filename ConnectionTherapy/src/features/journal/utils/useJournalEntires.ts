import { useSQLiteContext } from "expo-sqlite";
import { useAuth } from "../../auth/AuthContext";
import { JournalEntry } from "../journal.type";
import { useEffect, useState } from "react";
import { getJournalEntries } from "../services/journal.service";

export default function useJournalEntries() {
    const db = useSQLiteContext();
    const { user } = useAuth();
    const [journalEntries, setJournalEntries] = useState<Map<number, JournalEntry>>(new Map());
    const [queryParam, setQueryParam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchJournalEntries = async () => {
            if (!user) return;
            try {
                const entries: Map<number, JournalEntry> = await getJournalEntries(user.id, queryParam, db);
                setJournalEntries(entries);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchJournalEntries();

    }, [user, queryParam]);

    return { journalEntries, setJournalEntries, queryParam, setQueryParam, loading, setLoading, error, setError };
}