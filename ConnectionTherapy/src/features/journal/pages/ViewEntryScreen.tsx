import { View, Text, ScrollView } from "react-native";
import useJournalEntries from "../utils/useJournalEntires";
import ScreenHeader from "../../../globalComponents/ScreenHeader";
import BackButton from "../../../globalComponents/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate } from "../../../utils/dates";
import JournalText from "../components/JournalText";
import { Scroll } from "lucide-react-native";

interface ViewEntryScreenProps {
    id: number;
}

export default function ViewEntryScreen({ id }: ViewEntryScreenProps) {
    const { journalEntries } = useJournalEntries();
    const journalEntry = journalEntries.get(id);
    if (!journalEntry) return;

    return (
        <View className="flex-1 bg-primary-50 px-4 py-6">
            <SafeAreaView>
                <View className="flex-row items-center justify-center relative">
                    <BackButton className="absolute left-0 top-4 z-10" />
                    <ScreenHeader 
                        title={journalEntry.title} 
                        titleClassName="text-lg font-bold text-center text-text-primary"
                        subtitle={formatDate(new Date(journalEntry.date))}
                    />
                </View>
                <ScrollView className="w-full h-full">
                    <JournalText text={journalEntry.text} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}