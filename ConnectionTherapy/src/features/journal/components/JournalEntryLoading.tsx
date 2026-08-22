import { View, Text } from "react-native";
import { JournalEntry } from "../journal.type";
import SkeletonJournalEntryCard from "./SkeletonJournalEntryCard";

interface JournalEntryLoadingProps {
    isVisible: boolean;
}

export default function JournalEntryLoading({ isVisible }: JournalEntryLoadingProps) {
    if (!isVisible) return null;

    return (
        <View className="flex-1 bg-primary-50">
            {[...Array(5)].map((_, index) => (
                <SkeletonJournalEntryCard key={index} />
            ))}
        </View>
    );
}