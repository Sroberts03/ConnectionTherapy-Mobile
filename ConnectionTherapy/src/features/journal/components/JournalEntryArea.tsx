import { View, Text } from "react-native";
import { JournalEntry } from "../journal.type";
import JournalEntryCard from "./JournalEntryCard";
import ScreenHeader from "../../../globalComponents/ScreenHeader";
import AddButton from "../../../globalComponents/AddButton";

interface JournalEntryAreaProps {
    isVisible: boolean;
    journalEntries: Map<number, JournalEntry>;
}

export default function JournalEntryArea({ isVisible, journalEntries }: JournalEntryAreaProps) {
    if (!isVisible) return null;

    return (
        <View className="flex-1 bg-primary-50">
            <View className="mb-4">
                <ScreenHeader title="Journal Entries" />
            </View>
            {Array.from(journalEntries.values()).map(entry => (
                <JournalEntryCard key={entry.id} journalEntry={entry} />
            ))}
        </View>
    );
}