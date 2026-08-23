import { View, Text, TouchableOpacity } from "react-native";
import { JournalEntry } from "../journal.type";
import { formatJournalDate } from "../../../utils/dates";
import { useRouter } from "expo-router/build/hooks/useRouter";

interface JournalEntryCardProps {
    journalEntry: JournalEntry;
}

export default function JournalEntryCard({ journalEntry }: JournalEntryCardProps) {
    const router = useRouter();
    const formatText = (text: string) => {
        const maxLength = 200;
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + ".....";
        }
        return text;
    };
    return (
        <TouchableOpacity 
            className="bg-white rounded-2xl border border-neutral-200 mb-4 p-4 shadow-sm"
            onPress={() => router.push(`/(journal)/view/${journalEntry.id}`)}
        >
            <View className="rounded-full mb-4">
                <Text className="text-lg font-bold text-neutral-800">
                    {journalEntry.title}
                </Text>
            </View>

            <View className="mb-3 rounded-full">
                <Text className="text-base text-neutral-600 leading-6">
                    {formatText(journalEntry.text)}
                </Text>
            </View>

            <View className="rounded-full mr-2">
                <Text className="text-sm text-neutral-500">
                    {formatJournalDate(journalEntry.date)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}