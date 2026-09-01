import { createContext, useContext, useEffect, useState } from "react";
import { JournalEntry } from "./journal.type";
import { useAuth } from "../auth/AuthContext";
import { deleteJournalEntryService, getJournalEntries, saveJournalEntryService } from "./services/journal.service";
import { NewJournalEntryDTO } from "./journal.dto";

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
    deleteEntry: (entryId: number) => Promise<void>;
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
            const entries: Map<number, JournalEntry> = await getJournalEntries(user.id, queryParam);
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
            journalEntry = await saveJournalEntryService(entry, user.id);
            const organizedJournalEntries: Map<number, JournalEntry> = organizeEntries(journalEntry)
            setJournalEntries(organizedJournalEntries);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }

    const organizeEntries = (newEntry: JournalEntry): Map<number, JournalEntry> => {
        let organizedEntries: Map<number, JournalEntry> = new Map();
        const entryExists = journalEntries.get(newEntry.id);
        if (entryExists) {
            organizedEntries = new Map(journalEntries);
            organizedEntries.set(newEntry.id, newEntry);
        } else {
            organizedEntries.set(newEntry.id, newEntry);
            journalEntries.forEach((entry, id) => {
                organizedEntries.set(id, entry);
            });
        }
        return organizedEntries;
    };

    const deleteEntry = async (entryId: number) => {
        if (!user) return;
        try {
            await deleteJournalEntryService(entryId, user.id);
            const updatedEntries = new Map(journalEntries);
            updatedEntries.delete(entryId);
            setJournalEntries(updatedEntries);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };

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
            FetchJournalEntries: fetchJournalEntries,
            deleteEntry
        }}>
            {children}
        </JournalContext.Provider>
    );
}
