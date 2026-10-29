import { useLocalSearchParams } from "expo-router";
import NewJournalEntry from "../../../features/journal/pages/NewJournalEntry";

export default function EditJournalEntry() {
    const entryId = useLocalSearchParams<{ id: string }>().id;
    
    return (
        <NewJournalEntry id={parseInt(entryId)} />
    );
}