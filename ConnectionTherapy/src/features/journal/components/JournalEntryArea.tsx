import { View, Text } from "react-native";
import { JournalEntry } from "../journal.type";
import JournalEntryCard from "./JournalEntryCard";
import ScreenHeader from "../../../globalComponents/ScreenHeader";
import { useJournalContext } from "../journal.context";
import NoJournalEntries from "./NoJournalEntries";

interface JournalEntryAreaProps {
    isVisible: boolean;
}

export default function JournalEntryArea({ isVisible }: JournalEntryAreaProps) {
    const { journalEntries } = useJournalContext();
    if (!isVisible) return null;

    return (
        <View className="flex-1 bg-primary-50">
            <View className="mb-4">
                <ScreenHeader title="Journal Entries" />
            </View>
            <NoJournalEntries isVisible={journalEntries.size === 0} />
            {Array.from(journalEntries.values()).map(entry => (
                <JournalEntryCard key={entry.id} journalEntry={entry} />
            ))}
        </View>
    );
}