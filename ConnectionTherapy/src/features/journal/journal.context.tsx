import { createContext, useContext, useEffect, useState } from "react";
import { JournalEntry } from "./journal.type";
import { useSQLiteContext } from "expo-sqlite";
import { useAuth } from "../auth/AuthContext";
import { getJournalEntries, saveJournalEntryService } from "./services/journal.service";
import { NewJournalEntryDTO } from "./journal.dto";
import { formatDate } from "../../utils/dates";

interface JournalContextType {
    journalEntries: Map<number, JournalEntry>;
    setJournalEntries: (journalEntries: Map<number, JournalEntry>) => void;
    queryParam: string;
    setQueryParam: (queryParam: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    FetchJournalEntries: () => Promise<void>;
    saveJournalEntry: (entry: NewJournalEntryDTO) => Promise<void>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function useJournalContext() {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error("useJournalContext must be used within a JournalProvider");
    }
    return context;
}

export function JournalProvider({ children }: { children: React.ReactNode }) {
    const db = useSQLiteContext();
    const { user } = useAuth();
    const [journalEntries, setJournalEntries] = useState<Map<number, JournalEntry>>(new Map());
    const [queryParam, setQueryParam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchJournalEntries();
    }, [queryParam]);

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

    const saveJournalEntry = async (entry: NewJournalEntryDTO) => {
        if (!user) return;
        try {
            let journalEntry: JournalEntry;
            journalEntry = await saveJournalEntryService(entry, user.id, db);
            const organizedJournalEntries: Map<number, JournalEntry> = organizeEntriesByDate(journalEntry)
            setJournalEntries(organizedJournalEntries);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }

    const organizeEntriesByDate = (newEntry: JournalEntry): Map<number, JournalEntry> => {
        const organizedEntries = new Map<number, JournalEntry>();
        organizedEntries.set(newEntry.id, newEntry);
        journalEntries.forEach((entry) => {
            if (entry.id !== newEntry.id) {
                organizedEntries.set(entry.id, entry);
            }
        });
        return organizedEntries;
    }

    return (
        <JournalContext.Provider value={{
            journalEntries,
            setJournalEntries,
            queryParam,
            setQueryParam,
            loading,
            setLoading,
            error,
            setError,
            saveJournalEntry,
            FetchJournalEntries: fetchJournalEntries
        }}>
            {children}
        </JournalContext.Provider>
    );
}
