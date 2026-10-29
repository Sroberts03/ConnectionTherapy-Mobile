import { View, ScrollView } from "react-native";
import ScreenHeader from "../../../globalComponents/ScreenHeader";
import BackButton from "../../../globalComponents/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalText from "../components/JournalText";
import JournalButtonContainer from "../components/JournalButtonContainer";
import { useRouter } from "expo-router";
import { useJournalContext } from "../journal.context";
import { formatJournalDate } from "../../../utils/dates";
import ConfirmDeleteEntry from "../components/ConfirmDeleteEntry";
import { useState } from "react";

interface ViewEntryScreenProps {
    id: number;
}

export default function ViewEntryScreen({ id }: ViewEntryScreenProps) {
    const router = useRouter();
    const { journalEntries } = useJournalContext();
    const journalEntry = journalEntries.get(id);
    const [confirmDelteVisible, setConfirmDeleteVisible] = useState(false);
    if (!journalEntry) return;

    return (
        <SafeAreaView className="flex-1 bg-primary-50">
            <View className="flex-row items-center justify-center relative px-4 pt-2">
                <BackButton className="absolute left-4 top-2 z-10" />
                <ScreenHeader 
                    title={journalEntry.title} 
                    titleClassName="text-lg font-bold text-center text-text-primary px-8"
                    subtitle={formatJournalDate(journalEntry.date)}
                />
            </View>
            <ScrollView className="flex-1 w-full px-4">
                <JournalText text={journalEntry.text} />
            </ScrollView>
            <JournalButtonContainer 
                onEditPress={() => {router.push(`(journal)/edit/${id}`)}} 
                onDeletePress={() => setConfirmDeleteVisible(true)} 
            />
            <ConfirmDeleteEntry
                entryId={id}
                isVisible={confirmDelteVisible}
                onClose={
                    () => {
                        setConfirmDeleteVisible(false)
                        router.back();
                    }
                }
            />
        </SafeAreaView>
    );
}