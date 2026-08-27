import { ScrollView, View } from "react-native";
import NewJournalEntryHeader from "../components/NewJournalEntryHeader";
import { JournalEntry } from "../journal.type";
import { useState } from "react";
import { useJournalContext } from "../journal.context";
import { getJournalEntryById, getJournalTitleTextAndDate,  } from "../utils/NewJournalEntryHelpers";
import { formatJournalDate } from "../../../utils/dates";
import JournalTextEntry from "../components/JournalTextEntry";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewJournalEntryDTO } from "../journal.dto";
import BackButton from "../../../globalComponents/BackButton";
import JournalButton from "../components/JournalButton";
import { useRouter } from "expo-router/build/hooks/useRouter";

interface NewJournalEntryProps {
    id?: number;
}

export default function NewJournalEntry({ id }: NewJournalEntryProps) {
    const router = useRouter();
    const { journalEntries, saveJournalEntry, error } = useJournalContext();
    const journalEntry: JournalEntry | undefined = getJournalEntryById(journalEntries, id);
    const { title, text, date } = getJournalTitleTextAndDate(journalEntry);
    const [newTitle, setNewTitle] = useState(title);
    const [newText, setNewText] = useState(text);

    const createNewEntry = (): NewJournalEntryDTO => {
        if (journalEntry?.id === undefined) {
            return {
                title: newTitle,
                text: newText,
                date: date,
            };
        } else {
            return {
                id: journalEntry.id,
                title: newTitle,
                text: newText,
                date: date,
            };
        }
    };

    const handleSave = async () => { 
        const newEntry: NewJournalEntryDTO = createNewEntry();
        await saveJournalEntry(newEntry);
        if (!error) {
            router.back();
        }
    }
    
    return (
        <View className="flex-1 items-center justify-center">
            <SafeAreaView className="flex-1 w-full bg-primary-50">
                <View className="flex-row items-center justify-center relative mb-4">
                    <BackButton className="absolute left-0 top-4 z-10 ml-5" />
                    <NewJournalEntryHeader 
                        title={newTitle}
                        setTitle={setNewTitle}
                        date={formatJournalDate(date)}
                    />
                </View>
                <ScrollView className="flex-1 w-full bg-primary-50">
                    <JournalTextEntry
                        text={newText}
                        setText={setNewText}
                    />
                </ScrollView>
                <JournalButton
                    isVisible={true}
                    onPress={handleSave}
                    iconName="save"
                    className="absolute bottom-12 right-8 bg-primary-500 p-4 rounded-full shadow-sm"
                />
            </SafeAreaView>
        </View>
    );
}