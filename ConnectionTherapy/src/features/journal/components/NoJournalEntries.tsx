import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface NoJournalEntriesProps {
    isVisible: boolean;
}


export default function NoJournalEntries({ isVisible }: NoJournalEntriesProps) {
    if (!isVisible) return null;
    
    return (
        <View className="flex-1 items-center justify-center gap-y-2 p-6">
            <Ionicons name="book-outline" size={48} color="#9ca3af" />
            <Text className="text-base text-neutral-600">No journal entries yet.</Text>
            <Text className="text-sm text-neutral-500 mt-1 text-center">
                Tap the + button to create your first journal entry and start tracking your thoughts and feelings.
            </Text>
        </View>
    );
}