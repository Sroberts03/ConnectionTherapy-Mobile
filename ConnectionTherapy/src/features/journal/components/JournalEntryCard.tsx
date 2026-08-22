import { View, Text, TouchableOpacity } from "react-native";
import { JournalEntry } from "../journal.type";
import { formatDate } from "../../../utils/dates";

interface JournalEntryCardProps {
    journalEntry: JournalEntry;
}

export default function JournalEntryCard({ journalEntry }: JournalEntryCardProps) {
    const formatText = (text: string) => {
        const maxLength = 200;
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + ".....";
        }
        return text;
    };
    
    return (
        <TouchableOpacity className="bg-white rounded-2xl border border-neutral-200 mb-4 p-4 shadow-sm">
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
                    {formatDate(new Date(journalEntry.date))}
                </Text>
            </View>
        </TouchableOpacity>
    );
}