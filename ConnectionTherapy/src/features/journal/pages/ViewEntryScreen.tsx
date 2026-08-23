import { View, Text, ScrollView } from "react-native";
import ScreenHeader from "../../../globalComponents/ScreenHeader";
import BackButton from "../../../globalComponents/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalText from "../components/JournalText";
import JournalButtonContainer from "../components/JournalButtonContainer";
import { useRouter } from "expo-router";
import { useJournalContext } from "../journal.context";
import { formatJournalDate } from "../../../utils/dates";

interface ViewEntryScreenProps {
    id: number;
}

export default function ViewEntryScreen({ id }: ViewEntryScreenProps) {
    const router = useRouter();
    const { journalEntries } = useJournalContext();
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
                        subtitle={formatJournalDate(journalEntry.date)}
                    />
                </View>
                <ScrollView className="w-full h-full">
                    <JournalText text={journalEntry.text} />
                </ScrollView>
                <JournalButtonContainer 
                    onEditPress={() => {router.push(`(journal)/edit/${id}`)}} 
                    onDeletePress={() => {}} 
                />
            </SafeAreaView>
        </View>
    );
}